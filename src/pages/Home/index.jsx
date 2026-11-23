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

  const heroProduct = products[0];

  return (
    <div className="home-page">
      <main className="home-content">
        {/* Editorial Asymmetric Hero */}
        <section className="hero-grid">
          <div className="hero-text-block">
            <span className="hero-tag">NEW SEASON / ARCHIVE 2026</span>

            <h1>
              EVERYTHING YOU NEED.
              <br />
              CURATED IN ONE PLACE.
            </h1>

            <p className="hero-subtext">
              Minimalist essentials, modern electronics, and everyday goods
              selected for quality and utility.
            </p>

            <div className="hero-cta-row">
              <Link to="/products" className="btn-primary-dark">
                Explore Collection
              </Link>
              <Link to="/products" className="btn-outline-dark">
                New Arrivals
              </Link>
            </div>
          </div>

          <div className="hero-visual-block">
            {heroProduct ? (
              <Link to={`/products/${heroProduct._id}`} className="hero-featured-frame">
                <img src={heroProduct.thumbnail} alt={heroProduct.title} />
                <div className="hero-featured-caption">
                  <span>FEATURED — {heroProduct.category}</span>
                  <strong>{heroProduct.title} · ${heroProduct.price}</strong>
                </div>
              </Link>
            ) : (
              <div className="hero-placeholder-frame">
                <span>CURATED ESSENTIALS</span>
              </div>
            )}
          </div>
        </section>

        {/* Minimalist Category Strip */}
        <section className="category-strip-section">
          <div className="strip-header">
            <h2>DEPARTMENTS</h2>
            <Link to="/products">VIEW ALL →</Link>
          </div>

          <div className="category-strip-grid">
            <Link to="/products" className="category-tile">
              <span className="tile-index">01</span>
              <h3>BEAUTY</h3>
              <p>Skincare &amp; grooming</p>
            </Link>

            <Link to="/products" className="category-tile">
              <span className="tile-index">02</span>
              <h3>ELECTRONICS</h3>
              <p>Audio, devices &amp; gear</p>
            </Link>

            <Link to="/products" className="category-tile">
              <span className="tile-index">03</span>
              <h3>FASHION</h3>
              <p>Apparel &amp; accessories</p>
            </Link>

            <Link to="/products" className="category-tile">
              <span className="tile-index">04</span>
              <h3>GROCERIES</h3>
              <p>Daily pantry staples</p>
            </Link>
          </div>
        </section>

        {/* Featured Products Grid */}
        <section className="featured-section">
          <div className="strip-header">
            <h2>SELECTED ITEMS</h2>
            <Link to="/products">SHOP CATALOG ({products.length}) →</Link>
          </div>

          {loading ? (
            <div className="home-loader">
              <Loader />
            </div>
          ) : (
            <ul className="featured-products-grid">
              {products.map((product) => (
                <ProductCard key={product._id} value={product} />
              ))}
            </ul>
          )}

          <div className="featured-footer">
            <Link to="/products" className="btn-muted-full">
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </section>

        {/* Store Manifesto Bar */}
        <section className="manifesto-bar">
          <div className="manifesto-item">
            <span>01 / QUALITY</span>
            <p>Vetted products built for daily longevity.</p>
          </div>
          <div className="manifesto-item">
            <span>02 / TRANSPARENCY</span>
            <p>Direct pricing with zero hidden markups.</p>
          </div>
          <div className="manifesto-item">
            <span>03 / DISPATCH</span>
            <p>Fast, reliable delivery on every order.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;