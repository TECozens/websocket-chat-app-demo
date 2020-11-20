import React from 'react'
import {Navbar} from 'react-bootstrap'
import {ReactComponent as ReactLogo} from '../../assets/cu-logo.svg'
import Profile from '../../components/Profile/Profile';
import './Toolbar.css';
const toolbar = (props) => {
    return (
        <div className="Toolbar">
            <Navbar sticky="top" bg="dark" variant="dark">

                <Navbar.Brand href="/">
                    <ReactLogo className="Logo" />
                </Navbar.Brand>

                <Navbar.Text>
                    <h4> Realtime Chat App </h4>
                </Navbar.Text>

                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">

             

                <Navbar.Text>
                <div className="shadow medium"> 
                    Your Id: <span className="text-muted">{props.userId}</span>
                </div>
                <Profile />
                </Navbar.Text>

                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default toolbar
