import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

import "./index.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { loadUserCart } = useCart();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      login(data.user, data.token);
      await loadUserCart();
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        {/* Title & Intro Outside the Form Card */}
        <div className="auth-outer-header">
          <Link to="/" className="auth-brand-title">
            E-COMMERCE
          </Link>
          <p className="auth-outer-desc">
            Everything you need, curated in one place. Sign in to manage your
            bag, track orders, and checkout seamlessly.
          </p>
        </div>

        {/* Bordered Form Card */}
        <div className="auth-box">
          <div className="auth-card-header">
            <span className="auth-step-tag">MEMBER ACCESS</span>
            <h1>SIGN IN</h1>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="name@example.com"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">PASSWORD</label>
              <div className="password-field">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <div className="auth-options-row">
              <label className="remember-check">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Keep me signed in</span>
              </label>
            </div>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>

          <p className="auth-legal-note">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>

          <div className="auth-footer">
            <span>Don&apos;t have an account?</span>
            <Link to="/register">Create one</Link>
          </div>
        </div>

        <Link to="/" className="auth-back-link">
          ← CONTINUE BROWSING STORE
        </Link>
      </div>
    </div>
  );
};

export default Login;
