import React, {useState, useEffect} from 'react'
import {Button, Form, Jumbotron, ListGroup, Col,} from 'react-bootstrap'
import { initiateSocket, disconnectSocket, subscribeToChat, sendMessage, getRoomUsers } from '../../Socket/socketHelper';
import {Scrollbars} from "react-custom-scrollbars";
import './Room.css'
import sound from '../../../assets/sound.mp3'
import useSound from 'use-sound'

const Room = (props) => {
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("")
    const [play] = useSound(sound);
    const username = props.username
    const room = props.currentRoom

    useEffect(() => {

        if (room) {
            initiateSocket(username, room);
        }

        subscribeToChat((err, data) => {
            if(err) return;
            play.apply(()=> play())
            setChat(oldChats =>[data, ...oldChats])
        });

        return () => {
            disconnectSocket();
        }
    }, [room, play]);

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
                <Col>
                    <h1>Room | {room}</h1>
                    <h2>Your ID | {username}</h2>
                    <h1>Chat</h1>
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
                    <p>Message Count: {chat.length}</p>
                    <Form.Control placeholder="Type a message" type="text" name="name" value={message}
                                  onChange={e => setMessage(e.target.value)}
                                  onKeyPress={handleKeyPress}
                    />
                    <Button onClick={handleSend} variant="dark" block>Send</Button>
                </Col>
            </Jumbotron>
        </div>
    )
}

export default Room