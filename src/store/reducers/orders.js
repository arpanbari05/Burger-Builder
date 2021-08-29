import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false, 
    purchased: false
}

const reducer = (state = initialState, action) => {
    let updatedProps;

    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false });
       
        case actionTypes.PURCHASE_START:
            return updateObject(state, { loading: true });
          
        case actionTypes.PURCHASE_SUCCESS:
            const orderDetails = {
                id: action.id,
                ...action.orderDetails
            }
            updatedProps = {
                loading: false,
                purchased: true,
                orders: state.orders.concat({ orderDetails: orderDetails })
            } 
            return updateObject(state, updatedProps);
          
        case actionTypes.PURCHASE_FAIL:
        return updateObject(state, { loading: false });
          
        case actionTypes.FETCH_ORDER_START:
            return updateObject(state, { loading: true });
           
        case actionTypes.FETCH_ORDER_SUCCESS:

            updatedProps = {
                loading: false,
                orders: action.orders
            }
            return updateObject(state, updatedProps);
            
        case actionTypes.FETCH_ORDER_FAIL:
            return updateObject(state, { loading: false});
            
        default: return state
    }
}

export default reducer;