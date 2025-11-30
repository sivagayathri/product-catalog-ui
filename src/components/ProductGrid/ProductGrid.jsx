import ProductCard from '../ProductCard/ProductCard';
import './productGrid.css';

const ProductGrid = ({ products }) => {
  return (
    <div className="products-grid">
      {products.map((p, i) => (
        <ProductCard key={i} product={p} />
      ))}
    </div>
  );
};

export default ProductGrid;
