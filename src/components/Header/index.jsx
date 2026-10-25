import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import "./index.css";

const Header = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="header-container">
      <div className="header-logo">
        <Link to="/" className="title">
          E-commerce<span>.</span>
        </Link>
      </div>

      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart" className="cart-link">
          Cart 
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </nav>

      <div className="header-actions">
        {user ? (
          <div className="user-profile-actions">
            <span className="user-name">
              Hi, <strong>{user.name}</strong>
            </span>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;