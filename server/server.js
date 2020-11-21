const express = require('express')
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 3001;
const formatMessage = require('./utils/messages');
const {userJoin, userLeave, getRoomUsers, getCurrentUser} = require('./utils/users');

http.listen(PORT, () => {console.log(`LISTENING ON PORT ${PORT}`);});
// Run when client connects
io.on('connection', socket => {
        socket.on('joinRoom', ({username, room}) => {
            console.log("Name of User", username)
            console.log("Name of Room", room)

            const user = userJoin(socket.id, username, room);

            console.log("Connected socket", user, "To Room", user.room)

            socket.join(user.room);
            socket.emit('message', formatMessage(room,`Welcome to ${room}, ${username}`)); // Welcome current user
            socket.to(user.room).emit('message', formatMessage(room, `${user.username} has joined the chat`)); // sending to all clients in room except sender

            console.log("Before Roster", room)

            const data = getRoomUsers(room)
            let inout;

            // Send users and room info
            socket.to(user.room).emit('roomUsers', {
                users: getRoomUsers(user.room)
            });

        });

        // Listen for Message
        socket.on('message', message => {
            const user = getCurrentUser(socket.id);
            console.log("New Message In: ", user.room)
            socket.to(user.room).emit('message', formatMessage(user.username, message));
            socket.emit('message', formatMessage(user.username, message));
        });

        // Runs when client disconnects
        socket.on('disconnect', () => {
            const user = userLeave(socket.id);
            console.log("Disconnected Socket of", user)
            if (user) {
                socket.to(user.room).emit('message', formatMessage(user.room, `${user.username} has left the chat`));
                const data = getRoomUsers(user.room)
                let inout;
                socket.to(user.room).emit('roster', {data, inout});
                // Send users and room info
                socket.leave(user.room)
            }
        });
});

const mongoose = require('mongoose');// NOTE Mongo
const roomSchema = require('./models/roomSchema');

// REVIEW Don't Hardcode it use process.env
const CONNECTOR = 'mongodb+srv://admin:admin@rockpaperscissors.jerib.mongodb.net/rockpaperscissors?retryWrites=true&w=majority'
mongoose.connect(CONNECTOR,{ useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));// NOTE Handle Db Connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const dbRouter = express.Router();// NOTE Router to handle route requests from dbService
app.use('/rockpaperscissor', dbRouter);

dbRouter.post('/addRoom', (request, results) => {
    const {'room': room} = request.body;    //Ingredients for Recipe
    const newRoom = new roomSchema({room});    //Recipe I want
    //Store Cooked Recipe
    newRoom.save((err) => {
        if (err) {
            return results.json({success: false, error: err});
        }
        return results.json({ success: true });
    });
});

dbRouter.get('/getRoomSchema', (req, res) => {
    roomSchema.find((err, String) => {
        if (err) {
            return res.json({success: false, error: err});
        }
        return res.json({ success: true, room: String });
    });
});

dbRouter.delete('/rmRoom', function rmRoom(req, res) {
    const { id } = req.body;
    roomSchema.findByIdAndRemove(id, (err) => {
        if (err) {
            return res.send(err);
        }
        return res.json({ success: true });
    });
});