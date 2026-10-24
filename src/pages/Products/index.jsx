import { useEffect, useState } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import SearchBar from "../../components/SearchBar";
import CategoryFilter from "../../components/CategoryFilter";
import ProductCard from "../../components/ProductCard";

import { getProducts } from "../../services/api";

import "./index.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data.products);
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

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

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
      <Header />

      <main>
        {loading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <>
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

              <select value={sortBy} onChange={handleSort}>
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

            <ul className="products-container">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  value={product}
                />
              ))}
            </ul>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Products;