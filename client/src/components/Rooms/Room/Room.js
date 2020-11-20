import React, {useState, useEffect, useRef} from 'react'
import {Button, Form, Jumbotron, Row, ListGroup,} from 'react-bootstrap'
import { initiateSocket, disconnectSocket, subscribeToChat, sendMessage } from '../../Socket/socketHelper';
import {Scrollbars} from "react-custom-scrollbars";
import './Room.css'

const Room = (props) => {
    const [chat, setChat] = useState([]);
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")

    const username = props.username
    const room = props.currentRoom




    useEffect(() => {
        if (room) initiateSocket(username,room);

        subscribeToChat((err, data) => {
            if(err) return;
            setChat(oldChats =>[data, ...oldChats])
        });

        return () => {
            disconnectSocket();
        }
    }, [room]);

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


    const handleKeyPress = (event) => {

        if(event.key === 'Enter'){
            handleSend()
        }

    }

    const handleSend = () => {
        if(message === '') {
            alert("Type Something")
        } else {
            sendMessage(room, message)
            setMessage('')
        }
    }

    return (
        <div>
            <Jumbotron>
                <h1>Current Room: {room}</h1>
                <h2>Your ID:{username}</h2>

                <h1>Live Chat:</h1>
                <div className="messages-container">
                        <Scrollbars style={{height: 300}}>
                        <ListGroup variant="flush" >
                            {chat.map((m ,i) => {
                                if(m.includes(username)) {
                                    return (
                                        <ListGroup.Item className="message-item my-message" key={i}>
                                            <Form.Label>
                                                {m}
                                            </Form.Label>
                                        </ListGroup.Item>
                                    )
                                } else {
                                    return (
                                        <ListGroup.Item className="message-item received-message" key={i}>
                                            <Form.Label>
                                                {m}
                                            </Form.Label>
                                        </ListGroup.Item>
                                    )
                                }
                            }).reverse()}
                        </ListGroup>
                        </Scrollbars>
                </div>


                <Form.Control placeholder="Type a message" type="text" name="name" value={message}
                       onChange={e => setMessage(e.target.value)}
                       onKeyPress={handleKeyPress}

                />

                <Button onClick={handleSend} variant="dark" block>Send</Button>

            </Jumbotron>
        </div>
    )
}

export default Room