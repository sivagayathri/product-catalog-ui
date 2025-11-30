const BASE_URL = import.meta.env.VITE_API_URL;

const request = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`);

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error('API Request Failed:', err);
    throw err;
  }
};

export const getProducts = async () => {
  const data = await request('/products');
  return data.items;
};

export const getCategories = async () => {
  const data = await request('/categories');
  return data.categories;
};
