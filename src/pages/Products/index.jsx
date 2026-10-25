import { useEffect, useState } from "react";

import Loader from "../../components/Loader";
import SearchBar from "../../components/SearchBar";
import CategoryFilter from "../../components/CategoryFilter";
import ProductCard from "../../components/ProductCard";

import { useAuth } from "../../context/AuthContext";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/api";

import "./index.css";

const initialFormData = {
  title: "",
  description: "",
  price: "",
  category: "",
  brand: "",
  thumbnail: "",
  rating: "",
  stock: "",
};

const Products = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSort = (event) => {
    setSortBy(event.target.value);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData(initialFormData);
    setError("");
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingId(product._id);

    setFormData({
      title: product.title || "",
      description: product.description || "",
      price: product.price ?? "",
      category: product.category || "",
      brand: product.brand || "",
      thumbnail: product.thumbnail || "",
      rating: product.rating ?? "",
      stock: product.stock ?? "",
    });

    setError("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(initialFormData);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    const productData = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      brand: formData.brand,
      thumbnail: formData.thumbnail,
      rating: Number(formData.rating),
      stock: Number(formData.stock),
    };

    try {
      if (editingId) {
        const updatedProduct = await updateProduct(
          editingId,
          productData
        );

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editingId
              ? updatedProduct
              : product
          )
        );
      } else {
        const newProduct = await createProduct(productData);

        setProducts((prevProducts) => [
          newProduct,
          ...prevProducts,
        ]);
      }

      closeForm();
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteProduct(id);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "rating-high") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  if (sortBy === "name") {
    filteredProducts.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  return (
    <div className="products-page">
      <main>
        {loading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <>
            <div className="products-heading">
              <div className="products-title-section">
                <h1>Products</h1>

                {isAdmin && (
                  <span className="admin-badge">
                    ADMIN
                  </span>
                )}
              </div>

              {isAdmin && (
                <button
                  className="add-product-button"
                  onClick={openAddForm}
                >
                  + Add Product
                </button>
              )}
            </div>

            {isAdmin && showForm && (
              <form
                className="admin-product-form"
                onSubmit={handleSubmit}
              >
                <div className="form-header">
                  <h2>
                    {editingId
                      ? "Edit Product"
                      : "Add Product"}
                  </h2>

                  <button
                    type="button"
                    className="close-form-button"
                    onClick={closeForm}
                  >
                    ×
                  </button>
                </div>

                {error && (
                  <p className="admin-form-error">
                    {error}
                  </p>
                )}

                <div className="form-grid">
                  <input
                    type="text"
                    name="title"
                    placeholder="Product title"
                    value={formData.title}
                    onChange={handleFormChange}
                    required
                  />

                  <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={formData.brand}
                    onChange={handleFormChange}
                    required
                  />

                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleFormChange}
                    required
                  />

                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleFormChange}
                    required
                  />

                  <input
                    type="number"
                    name="rating"
                    placeholder="Rating"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleFormChange}
                  />

                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    min="0"
                    value={formData.stock}
                    onChange={handleFormChange}
                  />

                  <input
                    type="url"
                    name="thumbnail"
                    placeholder="Image URL"
                    value={formData.thumbnail}
                    onChange={handleFormChange}
                    required
                  />

                  <textarea
                    name="description"
                    placeholder="Product description"
                    value={formData.description}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="save-product-button"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : editingId
                      ? "Update Product"
                      : "Create Product"}
                  </button>
                </div>
              </form>
            )}

            <div className="products-controls">
              <SearchBar
                value={search}
                onChange={handleSearch}
              />

              <CategoryFilter
                categories={categories}
                value={category}
                onChange={handleCategoryChange}
              />

              <select
                value={sortBy}
                onChange={handleSort}
              >
                <option value="">Sort By</option>
                <option value="price-low">
                  Price: Low to High
                </option>
                <option value="price-high">
                  Price: High to Low
                </option>
                <option value="rating-high">
                  Rating: High to Low
                </option>
                <option value="name">
                  Name: A-Z
                </option>
              </select>
            </div>

            {error && !showForm && (
              <p className="admin-action-error">
                {error}
              </p>
            )}

            <ul className="products-container">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  value={product}
                  isAdmin={isAdmin}
                  onEdit={openEditForm}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default Products;