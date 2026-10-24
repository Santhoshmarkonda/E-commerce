import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./index.css";

const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className="header-container">
      <div className="header-logo">
        <Link to="/" className="title">
          E-commerce
        </Link>
      </div>

      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>

        <Link to="/cart">
          Cart ({cartCount})
        </Link>
      </nav>

      <div className="header-actions">
        <button className="logout-btn">Logout</button>
      </div>
    </header>
  );
};

export default Header;