import { Link } from "react-router-dom";
import "./index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-mark">E-COMMERCE</span>
          <p>© 2026 All rights reserved.</p>
        </div>

        <div className="footer-links">
          <Link to="/products">Collections</Link>
          <Link to="/">About</Link>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
