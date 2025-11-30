import { useEffect } from 'react';

export const useURLSync = (
  search,
  priceRange,
  selectedCategories,
  setSearchParams,
) => {
  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (priceRange) params.price = priceRange;
    if (selectedCategories.length > 0)
      params.category = selectedCategories.join(',');

    setSearchParams(params);
  }, [search, priceRange, selectedCategories, setSearchParams]);
};
