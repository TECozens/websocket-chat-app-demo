import React, {useRef} from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import {v4 as uuidV4} from 'uuid'

export default function Login({ onIdSubmit }) {
    const idRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        onIdSubmit(idRef.current.value);
    };

    // NOTE Generate Id and Submit to Next Render
    function generateId() {
        onIdSubmit(uuidV4());    
    };

    return (
        <Container className="align-items-center d-flex" style={{ height: '100vh'}}>

            <Form onSubmit={submitHandler} className="w-100">
                <Form.Group>
                    <Form.Label>Enter your ID</Form.Label>
                    <Form.Control type="text" ref={idRef} required />
                </Form.Group>

                <Button type="submit" className="mr-2">Login</Button>
                <Button onClick={generateId} variant="secondary">Create A New Id</Button>

            </Form>


        </Container>
    );
};
