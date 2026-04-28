import {
    ADD_TO_CART,
    CHECKOUT_REQUEST,
    CHECKOUT_FAILURE,
} from '../constants/ActionTypes';

const initialState = {
    addedIds: [],
    quantityById: {},
};

const addedIds = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return state.includes(action.productId) ? state : [...state, action.productId];
        default:
            return state;
    }
};

const quantityById = (state = {}, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                [action.productId]: (state[action.productId] || 0) + 1,
            };
        default:
            return state;
    }
};

const cart = (state = initialState, action) => {
    switch (action.type) {
        case CHECKOUT_REQUEST:
            return initialState;
        case CHECKOUT_FAILURE:
            return action.cart;
        case ADD_TO_CART:
            return {
                addedIds: addedIds(state.addedIds, action),
                quantityById: quantityById(state.quantityById, action),
            };
        default:
            return state;
    }
};

export default cart;

export const getQuantity = (state, id) => state.quantityById[id] || 0;

export const getAddedIds = (state) => state.addedIds;