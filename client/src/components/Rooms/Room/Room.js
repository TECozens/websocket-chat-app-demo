import React, {useState, useEffect, useRef} from 'react'
import {Button, Form, Jumbotron, Row, ListGroup,} from 'react-bootstrap'
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:3001"
const socket = io.connect(ENDPOINT)

const Room = (props) => {
    const messageRef = useRef()
    const username = props.username
    const room = props.currentRoom
    socket.emit('joinRoom', ({username, room}));
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [messageCount, setMessageCount] = useState(0);

    //When it loads, listening for messages
    useEffect(() => {
        console.log("Message Count", messageCount)

        //listen for other Messages
        socket.on('message', (data) => {
            console.log("Message", data)
            setMessageCount(messageCount + 1);
        })


        socket.on('message', (data) => {
            //Do something with data
            console.log("New message",data)
            getMessages(data);
        })

    },[setMessageCount])

    function getMessages(data) {
        setMessages(messages => [...messages, data])
    }

    function outputRoster(room, users) {
        const userList = users.map(user => {
            console.log("Added to Roster", user.username)
            return user.username
        })
        console.log("roster", userList)
    }


    function sendMessage() {
        const message = messageRef.current.value
        socket.emit('message', message)
    }

    return (
        <div>
            <Jumbotron>
                <h1>Current Room: {room}</h1>
                <h2>Your ID:{username}</h2>
                <ListGroup variant="flush">

                </ListGroup>
                <Row>
                    <Form.Control type="text" ref={messageRef}/>
                    <Button onClick={sendMessage} variant="outline-primary" block>Send</Button>
                </Row>


            </Jumbotron>
        </div>
    )
}

export default Room