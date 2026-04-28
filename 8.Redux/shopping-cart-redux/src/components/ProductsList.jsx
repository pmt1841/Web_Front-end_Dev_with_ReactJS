import React from 'react';
import ProductItem from './ProductItem';
import {useSelector, useDispatch} from 'react-redux';
import {getVisibleProducts} from '../reducers';
import {addToCart} from '../actions';

const ProductsList = () => {
    const products = useSelector(getVisibleProducts);
    const dispatch = useDispatch();

    return (
        <div>
            <h3>🛍️ Products</h3>
            {products.map((p) => (
                <ProductItem
                    key={p.id}
                    product={p}
                    onAddToCartClicked={() => dispatch(addToCart(p.id))}
                />
            ))}
        </div>
    );
};

export default ProductsList;