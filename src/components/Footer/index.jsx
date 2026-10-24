import { Link } from "react-router-dom";

import "./index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>E-commerce</h2>

        <p>© 2026 E-commerce. All rights reserved.</p>

        <div className="footer-links">
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Privacy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;