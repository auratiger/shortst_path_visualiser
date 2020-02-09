import React from 'react';
import CssClasses from './Button.module.css';

const Button = (props) => (
    <button className={props.class || CssClasses.Button} 
            type={props.type} 
            onClick={props.clicked}>
                                    {props.text}
    </button>
);

export default Button;