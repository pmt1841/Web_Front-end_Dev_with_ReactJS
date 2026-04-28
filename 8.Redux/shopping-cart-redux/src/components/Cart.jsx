import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartProducts, getTotal } from '../reducers';
import { checkout } from '../actions';
import Product from './Product';
import '../styles/Cart.css';

const Cart = () => {
    const products = useSelector(getCartProducts);
    const total = useSelector(getTotal);
    const dispatch = useDispatch();

    const handleCheckout = () => {
        dispatch(checkout(products));
    };

    return (
        <div className="cart">
            <h2>🛒 Your Cart</h2>
            <div className="cart-items">
                {products.length === 0 ? (
                    <div className="empty-cart">📝 Please add some products to cart.</div>
                ) : (
                    products.map((p) => (
                        <Product key={p.id} {...p} />
                    ))
                )}
            </div>
            <div className="cart-summary">
                <div className="total">💰 Total: {total} $</div>
                <div className="cart-actions">
                    <button
                        className="checkout-btn"
                        disabled={products.length === 0}
                        onClick={handleCheckout}
                    >
                        ✅ Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;