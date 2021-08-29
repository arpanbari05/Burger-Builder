import React from 'react';
import classes from './Backdrop.css';

const Backdrop = ( props ) => {
    if (props.show) return <div onClick={props.hide} className={classes.Backdrop}></div>
    else return null;
}

export default Backdrop;