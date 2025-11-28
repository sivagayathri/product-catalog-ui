export const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
