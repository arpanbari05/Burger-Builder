import React from 'react';
import classes from './Button.css';

const Button = ( props ) => {
    let btnClass;

    if (props.type === 'continue') {
        btnClass = classes.Continue;
    } else if (props.type === 'cancel') {
        btnClass = classes.Cancel;
    }

    return (
        <button 
        onClick={props.clicked} 
        className={btnClass}
        disabled={props.disabled} >{props.children}</button>
    )
}

export default Button;