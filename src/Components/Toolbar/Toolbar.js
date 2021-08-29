import React from 'react';
import classes from './Toolbar.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import SideDrawerToggler from '../SideDrawerToggler/SideDrawerToggler';

const Toolbar = ( props ) => {
    return (
        <header className={classes.Toolbar}>
            <SideDrawerToggler toggleHandler={props.clicked} />
            <Logo />
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuthenticated} />
            </nav>
        </header>
    )
}

export default Toolbar;