import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

export const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false, 
    building: false
}

const reducer = ( state = initialState, action ) => {
    let updatedProps;
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            updatedProps = {
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + action.ingredientPrice,
                building: true
            }
            return updateObject(state, updatedProps);
           
        case actionTypes.REMOVE_INGREDIENT:
            updatedProps = {
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - action.ingredientPrice,
                building: true
            }
            return updateObject(state, updatedProps);
        
        case actionTypes.INIT_INGREDIENTS:
            updatedProps = {
                totalPrice: initialState.totalPrice,
                ingredients: action.ingredients,
                error: false,
                building: false
            }
            return updateObject(state, updatedProps);
        
        case actionTypes.FAIL_INGREDIENTS: 
            
            return updateObject(state, { error: true });

        default: return state;
    }
}

export default reducer;