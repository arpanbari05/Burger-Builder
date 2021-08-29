import React from 'react';
import classes from './Order.css';

const Order = ( props ) => {

    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push(
            <span key={ingredientName} 
            className={classes.Ingredient}>
                {ingredientName}: {props.ingredients[ingredientName]}
            </span>
        );
    }
    
    return (
        <div className={classes.Order }>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order;