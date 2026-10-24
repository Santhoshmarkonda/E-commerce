import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

import { getProductById } from "../../services/api";

import "./index.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);

        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />

        <div className="loader-container">
          <Loader />
        </div>

        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />

        <p className="not-found">
          Product not found.
        </p>

        <Footer />
      </>
    );
  }

  return (
    <div className="product-details-page">
      <Header />

      <main className="product-details">
        <div className="product-details-image">
          <img
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="product-details-info">
          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.title}</h1>

          <p className="product-brand">
            Brand: <strong>{product.brand}</strong>
          </p>

          <p className="product-description">
            {product.description}
          </p>

          <p className="product-rating">
            ⭐ {product.rating}
          </p>

          <h2>${product.price}</h2>

          <button
            className="add-cart-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;