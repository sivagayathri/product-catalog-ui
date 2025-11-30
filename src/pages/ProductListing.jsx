import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getProducts, getCategories } from '../services/api';
import Filters from '../components/Filters/Filters';
import ProductGrid from '../components/ProductGrid/ProductGrid';

import './productListing.css';

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || '');
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get('category') ? searchParams.get('category').split(',') : [],
  );

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const items = await getProducts();
      const cats = await getCategories();

      setProducts(items);
      setFiltered(items);
      setCategories(cats);
    };

    loadData();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (search.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      result = result.filter((p) => {
        const priceVal = Number(p.price.replace('$', ''));
        return priceVal >= min && priceVal <= max;
      });
    }

    setFiltered(result);
  }, [search, priceRange, selectedCategories, products]);

  useEffect(() => {
    const params = {};

    if (search) params.search = search;
    if (priceRange) params.price = priceRange;
    if (selectedCategories.length > 0)
      params.category = selectedCategories.join(',');

    setSearchParams(params);
  }, [search, priceRange, selectedCategories]);

  return (
    <div className="product-page">
      <h2>Product Catalog</h2>
      <Filters
        search={search}
        setSearch={setSearch}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      <ProductGrid products={filtered} />
    </div>
  );
};

export default ProductListing;
