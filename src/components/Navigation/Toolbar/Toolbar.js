import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Toolbar.module.css';

const toolbar = (props) => {

    return(
        <header>
            <nav className={classes.Toolbar}>
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
            </nav>
        </header>   
    );
};

export default (toolbar);