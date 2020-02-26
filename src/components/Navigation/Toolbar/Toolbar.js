import React from 'react';
import {NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Nav, Navbar, Form, FormControl } from 'react-bootstrap';

const toolbar = (props) => {

    return(
        <header>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand><NavLink to={"/"} exact>Home</NavLink></Navbar.Brand>
                <Nav className="mr-auto justify-content-center">
                <Nav.Item>
                    <NavLink to={"/Maps"} exact>Hello</NavLink>
                </Nav.Item>
                </Nav>
            </Navbar>

        </header>   
    );
};

export default (toolbar);