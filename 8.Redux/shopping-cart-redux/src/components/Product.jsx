const Product = ({ title, price, quantity }) => (
    <div>
        {title} - {price} $ {quantity ? `x ${quantity}` : null}
    </div>
);

export default Product;