const express = require('express')
const app = require('express')();
const cors = require('cors');
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3001;
const formatMessage = require('./utils/messages');
const {userJoin, userLeave, getRoomUsers, getCurrentUser} = require('./utils/users');

// Run when client connects
io.on('connection', socket => {
        socket.on('joinRoom', ({username, room}) => {
            console.log("Name of User", username)
            console.log("Name of Room", room)


            const user = userJoin(socket.id, username, room);
            console.log("Connected socket", user, "To Room", user.room)
            socket.join(user.room);


            // Welcome current user
            socket.emit('message', formatMessage(room,`Welcome to ${room}, ${username}`));

            // sending to all clients in room except sender
            socket.to(user.room).emit('message', formatMessage(room, `${user.username} has joined the chat`));

            // Send users and room info
            socket.to(user.room).emit('roster', {room: user.room, users: getRoomUsers(room)});
    });

    // Listen for Message
    socket.on('message', msg => {
        const user = getCurrentUser(socket.id);
        console.log("New Message In: ", user.room)
        socket.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        console.log("Disconnected Socket of", user)
        if (user) {
                socket
                    .to(user.room)
                    .emit(
                    'message',
                    formatMessage(user.room, `${user.username} has left the chat`)
                    );

                // Send users and room info
                socket
                    .to(user.room)
                    .emit(
                    'roomUsers', {
                        room: user.room,
                        users: getRoomUsers(user.room)
                    });

                socket
                    .leave(user.room)
        }
    });
});

http.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
});


// NOTE Mongo
const mongoose = require('mongoose');
const roomSchema = require('./models/roomSchema');

// REVIEW Don't Hardcode it use process.env
const CONNECTOR = 'mongodb+srv://admin:admin@rockpaperscissors.jerib.mongodb.net/rockpaperscissors?retryWrites=true&w=majority'
mongoose.connect(CONNECTOR,{ useNewUrlParser: true });
let db = mongoose.connection;

// NOTE Handle Db Connection
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// NOTE Router to handle route requests from dbService
const dbRouter = express.Router();
app.use('/rockpaperscissor', dbRouter);

dbRouter.post('/addRoom', (request, results) => {
    //Recipe I want

    //Ingredients for Recipe
    const {'room': room} = request.body;


    console.log("Room TEST",room)

    const newRoom = new roomSchema({room});

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