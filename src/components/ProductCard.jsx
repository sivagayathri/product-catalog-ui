import "./productCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />

      <div className="product-title">{product.title}</div>

      <div className="product-category">{product.category}</div>

      <div>
        {product.discountedPrice && (
          <span className="product-discount">{product.price}</span>
        )}
        <span className="product-price">
          {product.discountedPrice || product.price}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
