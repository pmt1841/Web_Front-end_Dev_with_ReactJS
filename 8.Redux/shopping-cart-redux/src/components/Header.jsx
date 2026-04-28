import React from 'react';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = ({ onCartClick }) => {
    const cart = useSelector(state => state.cart);

    return (
        <header className="header">
            <div className="container">
                <h1>Shopping Cart Redux</h1>
                <button onClick={onCartClick} className="cart-button">
                    🛒 Giỏ hàng ({cart.quantity})
                </button>
            </div>
        </header>
    );
};

export default Header;