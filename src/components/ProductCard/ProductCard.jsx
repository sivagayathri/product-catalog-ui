import './productCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />

      <div className="product-title">{product.title}</div>

      <div className="product-category">{product.category}</div>

      <div className="product-price-box">
        <span className="product-price">{product.price}</span>

        {product.discountedPrice && (
          <span className="product-discount-tag">
            Discount: {product.discountedPrice}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
