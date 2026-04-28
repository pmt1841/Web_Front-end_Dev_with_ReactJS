import Product from './Product';

const ProductItem = ({ product, onAddToCartClicked }) => (
    <div style={{ marginBottom: 20 }}>
        <Product {...product} />
        <button style={{ backgroundColor: 'rgb(118 177 120)' }}
                onClick={onAddToCartClicked}
                disabled={product.inventory <= 0}
        >
            {product.inventory > 0 ? '🛒 Add to cart' : '❌ Sold Out'}
        </button>
    </div>
);

export default ProductItem;