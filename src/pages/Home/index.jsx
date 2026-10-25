import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";

import { getProducts } from "../../services/api";

import "./index.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.slice(0, 6));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <main className="home-content">

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <p className="hero-label">WELCOME TO OUR STORE</p>

            <h1>
              Everything You Need,
              <br />
              All in One Place.
            </h1>

            <p className="hero-description">
              Discover quality products at great prices.
              Shop from our collection and find what you need.
            </p>

            <Link to="/products" className="shop-now-button">
              Shop Now
            </Link>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <div className="section-header">
            <p className="section-label">SHOP BY CATEGORY</p>

            <h2>Explore Our Categories</h2>

            <p>
              Find the products you're looking for quickly and easily.
            </p>
          </div>

          <div className="categories-grid">
            <Link to="/products" className="category-card">
              <h3>Beauty</h3>
              <p>Explore beauty products</p>
            </Link>

            <Link to="/products" className="category-card">
              <h3>Electronics</h3>
              <p>Latest electronic products</p>
            </Link>

            <Link to="/products" className="category-card">
              <h3>Fashion</h3>
              <p>Discover latest styles</p>
            </Link>

            <Link to="/products" className="category-card">
              <h3>Groceries</h3>
              <p>Everyday essentials</p>
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className="featured-section">
          <div className="section-header">
            <p className="section-label">OUR PRODUCTS</p>

            <h2>Featured Products</h2>

            <p>Discover some of our popular products.</p>
          </div>

          {loading ? (
            <div className="home-loader">
              <Loader />
            </div>
          ) : (
            <ul className="featured-products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  value={product}
                />
              ))}
            </ul>
          )}

          <Link
            to="/products"
            className="view-products-button"
          >
            View All Products
          </Link>
        </section>

        {/* Benefits Section */}
        <section className="benefits-section">
          <div className="benefit-card">
            <h3>Quality Products</h3>
            <p>Carefully selected products for your needs.</p>
          </div>

          <div className="benefit-card">
            <h3>Great Prices</h3>
            <p>Find products at competitive prices.</p>
          </div>

          <div className="benefit-card">
            <h3>Easy Shopping</h3>
            <p>Simple and convenient shopping experience.</p>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;