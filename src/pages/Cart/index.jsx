import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";

import "./index.css";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    subtotal,
  } = useCart();

  return (
    <div className="cart-page">
      <Header />

      <main className="cart-content">
        <div className="cart-header">
          <p className="cart-label">SHOPPING CART</p>
          <h1>Your Cart</h1>
          <p>Review your items before checkout.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>

            <h2>Your cart is empty</h2>

            <p>
              You haven't added any products to your cart yet.
            </p>

            <Link
              to="/products"
              className="continue-shopping-button"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-items-section">
              <div className="cart-items-header">
                <h2>Cart Items ({cartItems.length})</h2>

                <button
                  className="clear-cart-button"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>

              <div className="cart-items">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="cart-item-image"
                    />

                    <div className="cart-item-info">
                      <span className="cart-item-category">
                        {item.category}
                      </span>

                      <h3>{item.title}</h3>

                      <p className="cart-item-brand">
                        {item.brand}
                      </p>

                      <p className="cart-item-price">
                        ${item.price}
                      </p>

                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="remove-button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-total">
                      $
                      {(
                        item.price * item.quantity
                      ).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <hr />

              <div className="summary-total">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <button className="checkout-button">
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="continue-shopping"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;