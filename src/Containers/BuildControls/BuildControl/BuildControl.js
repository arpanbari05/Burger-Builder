import React from 'react';
import classes from './BuildControl.css';

const BuildControl = ( props ) => {
    return (
        <div className={classes.BuildControl}>
            <p>{props.label}</p>
            <button className={classes.More}
            onClick={props.addIngredientHandler}>More</button>
            <button className={classes.Less}
            onClick={props.removeIngredientHandler}>Less</button>
        </div>
    )
}

export default BuildControl;