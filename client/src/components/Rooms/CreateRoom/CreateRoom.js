import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import {addRoom} from '../../../service/roomService'

const CreateRoom = () => {
    const [showNewroom, setShowNewRoom] = useState(false);
    const [text, setText] = useState("")
    const handleClose = () => setShowNewRoom(false);
    const handleShow = () => setShowNewRoom(true);


    const newRoom = () => {
        const roomName = text

        addRoom({
                room: roomName
        })
        .then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })

        handleClose()
    }


    return (
        <div>
            <Button className="m-4" variant="dark" onClick={handleShow}>New Room</Button>

            <Modal centered size="lg" show={showNewroom} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Name your Room</Modal.Title>
                </Modal.Header>

                <Form onSubmit={newRoom}>
                    <Form.Group>
                        <Modal.Body>
                            Enter the name of this new Room
                            <Form.Control type="text" placeholder="Room Name" onChange={e => setText(e.target.value)} required/>          
                        </Modal.Body>

                        <Modal.Footer>
                            <Button block variant="outline-danger" onClick={handleClose}>
                                Close
                            </Button>
                            <Button block type="submit" variant="outline-success">
                                Save As New Room
                            </Button>
                        </Modal.Footer>
                    </Form.Group>
                
                </Form>
            </Modal>
        </div>
    )
}

export default CreateRoom