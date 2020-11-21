import React, {useEffect, useState} from 'react'
import {Button, Col, Jumbotron, ListGroup, Row} from 'react-bootstrap'
import {getRooms, rmRoom } from '../../service/roomService';
import CreateRoom from './CreateRoom/CreateRoom';
import { Scrollbars } from 'react-custom-scrollbars';
import Room from './Room/Room';
import './Rooms.css'

const Rooms = ({id}) => {
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [userCount, setUserCount] = useState(0)

    //Map the object
    useEffect(() => {
        getRooms()
            .then(
                (results) => {
                    const data = results.data.room;
                    setItems(data);
                },
                (err) => {
                    setError(err);
                }
            )
    }, [])

    // NOTE Store Room
    const [joinedRoom, setJoinedRoom] = useState([])
    
    // NOTE Update ComponentDidMount
    const [joined, setJoined] = useState(false)

    if (joined) {
        return (
            <div>
                <Row>
                    <Button block variant="outline-danger" 
                    onClick={() => 
                    {
                        setJoinedRoom([])
                        setJoined(false)
                        window.location.reload(false);
                    }}
                    > Exit </Button>
                </Row> 
                <Room username={id} currentRoom={joinedRoom[0]} />
            </div>
        )
    } else {
        return (
            <div> 
                <Jumbotron>
                <CreateRoom />
                    <Scrollbars style={{height: 300}}>
                    <ListGroup variant="flush">
                        {items.map((rooms, index)=> (
                            <ListGroup.Item key={index}>
                                    <Row>
                                        <Col>Room Name: {rooms.room}</Col>
                                        <Col>
                                            <Button className="btn center" variant="outline-warning"
                                            onClick={() => {
                                                setJoinedRoom([...joinedRoom, rooms.room]);
                                                setJoined(true);
                                            }}
                                            block> Join </Button>
                                        </Col>
                                        {/* <Col>
                                            <Button className="btn center" variant="danger" 
                                            onClick={() => {handleDelete(rooms.__id)}}
                                            >Delete</Button>
                                        </Col> */}
                                    </Row>
                            </ListGroup.Item>
                        ))}
                </ListGroup>
                </Scrollbars>
                </Jumbotron>
            </div>
        )
    }
}

export default Rooms
