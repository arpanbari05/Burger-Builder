import React from 'react';
import classes from './SideDrawerToggler.css';

const SideDrawerToggler = ( props ) => {
    return (
        <div className={classes.SideDrawerToggler}
        onClick={props.toggleHandler}>
            <div></div>
        </div>
    );
}

export default SideDrawerToggler;