import React from 'react';
import {NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Nav, Navbar, Form, FormControl } from 'react-bootstrap';

const toolbar = (props) => {

    return(
        <header>
            {/* <nav className={classes.Toolbar}>
                <ul className={classes.NavigationItems}>
                    <li className={classes.NavigationItem}>
                        Hello
                    </li>
                    <li className={classes.NavigationItem}>
                        <NavLink to={"/"} exact>Profile</NavLink>
                    </li>
                    <li className={classes.NavigationItem}>
                        <select>
                            <option value="volvo">red</option>
                            <option value="saab">green</option>
                            <option value="mercedes">yellow</option>
                            <option value="audi">blue</option>
                        </select>
                    </li>
                    <li className={[classes.NavigationItem, classes.User].join(" ")}>
                        <NavLink to={"/Profile"} exact>Hello</NavLink>
                    </li>
                </ul>
            </nav> */}


            <Navbar bg="dark" variant="dark">
                <Navbar.Brand><NavLink to={"/"} exact>Home</NavLink></Navbar.Brand>
                <Nav className="mr-auto justify-content-center">
                <Nav.Item>
                    <NavLink to={"/Profile"} exact>Hello</NavLink>
                </Nav.Item>
                </Nav>
            </Navbar>

        </header>   
    );
};

export default (toolbar);