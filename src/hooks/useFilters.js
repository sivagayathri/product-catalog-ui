export const useFilters = (
  products,
  search,
  priceRange,
  selectedCategories,
) => {
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

  return result;
};
