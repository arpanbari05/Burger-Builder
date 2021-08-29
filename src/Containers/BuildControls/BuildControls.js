import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const ctrls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const BuildControls = ( props ) => {

    let buttonStyle = null;
    props.isPurchasable ? buttonStyle = classes.Enabled : buttonStyle = classes.Disabled;
   
    return (
        <div className={classes.BuildControls}>
            <p>Total price of burger: ${props.fullPrice}</p>
            {
                ctrls.map(ctrl => {
                    return <BuildControl label={ctrl.label} 
                    key={ctrl.label}
                    addIngredientHandler={() => props.addHandler(ctrl.type)}
                    removeIngredientHandler={() => props.removeHandler(ctrl.type)} />
                })
            }
            <button 
            onClick={props.isPurchasable ? props.purchase : null}
            className={buttonStyle}>
                {props.isAuthenticated ? 'ORDER NOW' : 'SIGN IN TO ORDER'}
            </button>
        </div>
    );
    
}

export default BuildControls;