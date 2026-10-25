import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

import "./index.css";

const ProductCard = ({
  value,
  isAdmin = false,
  onEdit,
  onDelete,
}) => {
  const {
    _id,
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
    (item) => item._id === _id
  );

  const quantity = cartItem?.quantity ?? 0;

  const handleAddToCart = () => {
    addToCart(value);
  };

  const handleIncrease = () => {
    increaseQuantity(_id);
  };

  const handleDecrease = () => {
    decreaseQuantity(_id);
  };

  return (
    <li className="product-card">
      <Link
        to={`/products/${_id}`}
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
          to={`/products/${_id}`}
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

        {isAdmin && (
          <div className="admin-product-actions">
            <button
              className="edit-product-button"
              onClick={() => onEdit(value)}
            >
              Edit
            </button>

            <button
              className="delete-product-button"
              onClick={() => onDelete(_id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default ProductCard;