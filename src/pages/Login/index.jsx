import { Link } from "react-router-dom";

import "./index.css";

const Login = () => {
  return (
    <div className="auth-page">
      <main className="auth-layout">

        {/* Left Side - Branding */}
        <section className="auth-brand-section">
          <div className="brand-content">
            <Link to="/" className="brand-logo">
              E-commerce
            </Link>

            <p className="brand-label">
              YOUR SHOPPING DESTINATION
            </p>

            <h1>
              Everything you need,
              <br />
              all in one place.
            </h1>

            <p className="brand-description">
              Discover quality products, great prices,
              and a simple shopping experience.
            </p>

            <div className="cart-illustration">
              <svg
                viewBox="0 0 500 350"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M70 70 H105 L135 245 H375"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M125 100 H420 L385 225 H145 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinejoin="round"
                />

                <line
                  x1="145"
                  y1="140"
                  x2="405"
                  y2="140"
                  stroke="currentColor"
                  strokeWidth="8"
                />

                <line
                  x1="153"
                  y1="180"
                  x2="395"
                  y2="180"
                  stroke="currentColor"
                  strokeWidth="8"
                />

                <line
                  x1="180"
                  y1="105"
                  x2="180"
                  y2="220"
                  stroke="currentColor"
                  strokeWidth="8"
                />

                <line
                  x1="235"
                  y1="105"
                  x2="235"
                  y2="220"
                  stroke="currentColor"
                  strokeWidth="8"
                />

                <line
                  x1="290"
                  y1="105"
                  x2="290"
                  y2="220"
                  stroke="currentColor"
                  strokeWidth="8"
                />

                <line
                  x1="345"
                  y1="105"
                  x2="345"
                  y2="220"
                  stroke="currentColor"
                  strokeWidth="8"
                />

                <circle
                  cx="175"
                  cy="275"
                  r="25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                />

                <circle
                  cx="350"
                  cy="275"
                  r="25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Right Side - Login */}
        <section className="auth-form-section">
          <div className="auth-card">

            <div className="auth-header">
              <p className="auth-label">
                WELCOME BACK
              </p>

              <h2>Login</h2>

              <p>
                Sign in to continue shopping.
              </p>
            </div>

            <form className="auth-form">
              <div className="form-group">
                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              <div className="forgot-password">
                <Link to="#">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="auth-button"
              >
                Login
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Don't have an account?{" "}
                <Link to="/register">
                  Sign up
                </Link>
              </p>
            </div>

            <Link
              to="/"
              className="back-home"
            >
              ← Back to Store
            </Link>

          </div>
        </section>

      </main>
    </div>
  );
};

export default Login;
