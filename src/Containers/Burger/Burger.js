import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BugerIngredient';

const Burger = (props) => {
    
    let transformedIngredients = Object.keys(props.ingredients)
    .map(ele => {
        return [...Array(props.ingredients[ele])].map((_, index) => {
            return <BurgerIngredient key={ele + index} type={ele} />
        });
    })
    .reduce((acc, cur) => acc.concat(cur));


    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients to burger</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={'bread-top'} />
            {transformedIngredients}
            <BurgerIngredient type={'bread-bottom'} />
        </div>
    );
}

export default Burger;