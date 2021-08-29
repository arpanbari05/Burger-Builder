import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const Logo = () => { 
    return (
        <div className={classes.Logo}>
            <img alt={"Burger Logo"} className={classes.Logo} src={burgerLogo} />
        </div>
    )
}

export default Logo;