import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import "./index.css";

const ProductCard = ({ value }) => {
  const {
    id,
    title,
    category,
    price,
    brand,
    thumbnail,
    rating,
  } = value;

  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const cartItem = cartItems.find(
    (item) => item.id === id
  );

  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(value);
  };

  const handleIncrease = () => {
    increaseQuantity(id);
  };

  const handleDecrease = () => {
    decreaseQuantity(id);
  };

  return (
    <li className="product-card">
      <Link
        to={`/products/${id}`}
        className="product-image-link"
      >
        <div className="product-image-container">
          <img
            className="product-image"
            src={thumbnail}
            alt={title}
          />
        </div>
      </Link>

      <div className="product-info">
        <Link
          to={`/products/${id}`}
          className="product-title-link"
        >
          <span className="product-brand">
            {brand}
          </span>

          <h3 className="product-title">
            {title}
          </h3>
        </Link>

        <div className="product-meta">
          <span className="product-category">
            {category}
          </span>

          <span className="product-rating">
            ⭐ {rating}
          </span>
        </div>

        <div className="product-bottom">
          <span className="product-price">
            ${price}
          </span>

          {quantity === 0 ? (
            <button
              className="cart-button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          ) : (
            <div className="quantity-controls">
              <button
                onClick={handleDecrease}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={handleIncrease}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
