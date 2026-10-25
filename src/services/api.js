const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch products");
  }

  return data;
};

export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch product");
  }

  return data;
};

export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/products/categories`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch categories");
  }

  return data;
};

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const createProduct = async (product) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create product");
  }

  return data;
};

export const updateProduct = async (id, product) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update product");
  }

  return data;
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete product");
  }

  return data;
};

export const fetchUserCart = async () => {
  const response = await fetch(`${BASE_URL}/cart`, {
    headers: { ...getAuthHeaders() },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch cart");
  return data;
};

export const syncUserCart = async (items) => {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ items }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to sync cart");
  return data;
};

export const clearUserCartAPI = async () => {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to clear cart");
  return data;
};