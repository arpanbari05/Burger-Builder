import React from 'react';
import Aux from '../../HOC/Aux';
import Backdrop from '../Backdrop/Backdrop';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import classes from './SideDrawer.css';

const SideDrawer = (props) => {

    let toggleClass = [classes.SideDrawer, classes.Close];

    if (props.open) {
        toggleClass = [classes.SideDrawer, classes.Open]
    }

    return (
        <Aux>
            <Backdrop show={props.open}
            hide={props.hideSideDrawer} />
            <div className={toggleClass.join(' ')} onClick={props.hideSideDrawer}>
                <Logo/>
                <NavigationItems isAuthenticated={props.isAuthenticated} />
            </div>  
        </Aux>
        
        
    )
    
}

export default SideDrawer;