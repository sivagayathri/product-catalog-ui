import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import "./productListing.css";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const items = await getProducts();
      setProducts(items);
      setFiltered(items);
    };
    loadData();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (search.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      result = result.filter((p) => {
        const priceValue = Number(p.price.replace("$", ""));
        return priceValue >= min && priceValue <= max;
      });
    }

    setFiltered(result);
  }, [search, priceRange, category, products]);

  return (
    <div className="product-page">
      <div className="filters-row">
        <span>Search by Product Name</span>
        <input
          className="search-input"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
          <span>Price Range</span>
        <select
          className="filter-select"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value=""></option>
          <option value="0-30">$0 - $30</option>
          <option value="31-60">$31 - $60</option>
          <option value="61-100">$61 - $100</option>
        </select>
           <span>Category</span>
        <select
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=""></option>
          <option value="MOISTURIZERS">MOISTURIZERS</option>
          <option value="TREATMENTS">TREATMENTS</option>
          <option value="EYE CARE">EYE CARE</option>
          <option value="SUN CARE">SUN CARE</option>
        </select>
      </div>


      <div className="products-grid">
        {filtered.map((p, i) => (
          <ProductCard key={i} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
