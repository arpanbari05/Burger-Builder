import * as actionTypes from './actionTypes';
import axios from '../../Axios';

export const addIngredient = ( ingName, ingPrice ) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName,
        ingredientPrice: ingPrice
    }
}

export const removeIngredient = ( ingName, ingPrice ) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
        ingredientPrice: ingPrice
    }
}

const initIngs = ( ings ) => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
        ingredients: ings
    }
}

const failIngredient = ( error ) => {
    return {
        type: actionTypes.FAIL_INGREDIENTS,
        error: error
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get("https://burger-builder-82c22-default-rtdb.firebaseio.com/ingredients.json")
        .then(response => {
            dispatch(initIngs(response.data))
        })
        .catch(error => {
            dispatch(failIngredient(error));
        })
    }
}