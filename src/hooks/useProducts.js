import { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const prod = await getProducts();
      const cats = await getCategories();

      setProducts(prod);
      setCategories(cats);
      setLoading(false);
    };

    load();
  }, []);

  return { products, categories, loading };
};
