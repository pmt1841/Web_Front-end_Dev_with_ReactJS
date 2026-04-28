import { combineReducers } from 'redux';
import products, * as fromProducts from './products';
import cart, * as fromCart from './cart';

export default combineReducers({ products, cart });

export const getVisibleProducts = (state) =>
    fromProducts.getVisibleProducts(state.products);

export const getCartProducts = (state) =>
    fromCart.getAddedIds(state.cart).map((id) => ({
        ...fromProducts.getProduct(state.products, id),
        quantity: fromCart.getQuantity(state.cart, id),
    }));

export const getTotal = (state) =>
    getCartProducts(state)
        .reduce((total, p) => total + p.price * p.quantity, 0)
        .toFixed(2);