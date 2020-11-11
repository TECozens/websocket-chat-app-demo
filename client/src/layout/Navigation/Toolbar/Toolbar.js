import React from 'react'
import {Navbar} from 'react-bootstrap'
import {ReactComponent as ReactLogo} from '../../../assets/cu-logo.svg'
import './Toolbar.css';
const toolbar = (props) => {
    return (
        <div className="Toolbar">
            <Navbar fixed="top" bg="dark" variant="dark">

                <Navbar.Brand href="/">
                    <ReactLogo className="Logo" />
                </Navbar.Brand>

                <Navbar.Text>
                    <h4> Realtime Chat App </h4>
                </Navbar.Text>

                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">

                

                <Navbar.Text>
                <p>{props.userId}</p>
                </Navbar.Text>

                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default toolbar
