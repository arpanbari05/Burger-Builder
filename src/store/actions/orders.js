import * as actionTypes from './actionTypes';
import axios from '../../Axios';

const purchaseSuccess = ( id, orderDetails ) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        id: id,
        orderDetails: orderDetails
    }
}

const purchaseFail = () => {
    return {
        type: actionTypes.PURCHASE_FAIL
    }
}

export const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchase = ( orderDetails, tokenId ) => {
    return dispatch => {
        dispatch(purchaseStart());
        axios.post("/orders.json?auth=" + tokenId, orderDetails)
        .then(response => {
           dispatch(purchaseSuccess(response.data.name, orderDetails));
        })
        .catch(error => {
           dispatch(purchaseFail())
        })
    }
    
}

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

const fetchOrdersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL, 
        error: error
    }
}

export const fetchOrders = (tokenId, userId) => {

    
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + tokenId + '&orderBy="userId"&equalTo="'+ userId + '"';
        axios.get('/orders.json' + queryParams)
        .then(res => {
            const orders = [];
            for (let i in res.data) {
                orders.push({ id: i, ingredients: res.data[i].ingredients, price: res.data[i].totalPrice})
            }
            dispatch(fetchOrdersSuccess( orders ));

        })
        .catch(error => {
            dispatch(fetchOrdersFail( error ));
        });
    }
}