import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const NavigationItems = (props) => {

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem
                exact
                link={'/'}
                item={'Burger Builder'} />

            {
                props.isAuthenticated ? <NavigationItem
                    link={'/orders'}
                    item={'Orders'} /> : null
            }

            {!props.isAuthenticated ? <NavigationItem
                link={'/authentication'}
                item={'Authentication'} /> :
                <NavigationItem
                    link={'/logout'}
                    item={'Log out'} />}
        </ul>
    );
}

export default NavigationItems;