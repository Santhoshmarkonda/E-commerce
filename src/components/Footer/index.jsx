import { Link } from "react-router-dom";
import "./index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>E-commerce<span>.</span></h2>
          <p>© 2026 E-commerce Inc. All rights reserved.</p>
        </div>

        <div className="footer-links">
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;