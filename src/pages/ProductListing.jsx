import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

import Filters from '../components/Filters/Filters';
import ProductGrid from '../components/ProductGrid/ProductGrid';

import { useProducts } from '../hooks/useProducts';
import { useFilters } from '../hooks/useFilters';
import { useURLSync } from '../hooks/useURLSync';

import './productListing.css';

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || '');
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get('category') ? searchParams.get('category').split(',') : [],
  );

  const { products, categories, loading } = useProducts();

  const filtered = useFilters(products, search, priceRange, selectedCategories);

  useURLSync(search, priceRange, selectedCategories, setSearchParams);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="product-page">
      <h2 className="page-title">Product Catalog</h2>

      <Filters
        search={search}
        setSearch={setSearch}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      {filtered.length === 0 ? (
        <p className="no-items">Oops! No items available.</p>
      ) : (
        <ProductGrid products={filtered} />
      )}
    </div>
  );
};

export default ProductListing;
