import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState = {
    tokenId: null,
    userId: null,
    error: null,
    loading: false
}


const reducer = (state = initialState, action) => {
    let updatedProps;
    switch (action.type) {
        case actionTypes.AUTH_START:
            updatedProps = {
                loading: true,
                error: null
            }
            return updateObject(state, updatedProps);
        case actionTypes.AUTH_SUCCESS:
            updatedProps = {
                tokenId: action.tokenId,
                userId: action.userId,
                error: null,
                loading: false
            }
            return updateObject(state, updatedProps);
        case actionTypes.AUTH_FAIL:
            updatedProps = {
                error: action.error,
                loading: false
            }
            return updateObject(state, updatedProps);
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, { tokenId: null, userId: null });
        default: return state;
    }
}

export default reducer;