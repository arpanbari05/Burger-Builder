import React from 'react';
import Backdrop from '../../Components/Backdrop/Backdrop';
import Aux from '../../HOC/Aux';
import classes from './Spinner.css';

const Spinner = () => {
    return (
        <Aux>
            <Backdrop show />,
            <div className={classes.Spinner}>Loading...</div>
        </Aux>
        
    );
}

export default Spinner;