import React from "react";
import { useLocation } from "react-router-dom";
import "../App.css";

function Product() {
    const { state } = useLocation();

    return (
        <div className="app-container">
            <h2>Product Page</h2>
            {state && state.categoryId ? (
                <p className="product-info">Id selected: {state.categoryId}</p>
            ) : (
                <p className="product-info">No category selected</p>
            )}
        </div>
    );
}

export default Product;