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
      const data = await loginUser({
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", data);

      login(data.user, data.token);

      await loadUserCart();

      console.log("LOGIN SUCCESS");

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <main className="auth-layout">
        {/* =====================================================
            LEFT BRAND PANEL
        ====================================================== */}
        <section className="auth-brand-panel">
          <div className="brand-decoration brand-decoration-one" />
          <div className="brand-decoration brand-decoration-two" />
          <div className="brand-decoration brand-decoration-three" />

          <div className="brand-panel-content">
            <Link to="/" className="brand-logo">
              <span className="brand-mark">S</span>

              <span className="brand-name">
                Smart<span>Mart</span>
              </span>
            </Link>

            <div className="brand-message">
              <p className="brand-eyebrow">THE SMARTER WAY TO SHOP</p>

              <h1>
                Everything you want.
                <span> All in one place.</span>
              </h1>

              <p className="brand-description">
                Discover products you'll love, explore everyday essentials, and
                enjoy a shopping experience designed around you.
              </p>
            </div>

            <div className="brand-bottom">
              <div className="brand-line" />

              <p>Quality products · Simple shopping · Better choices</p>
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT LOGIN PANEL
        ====================================================== */}
        <section className="auth-form-panel">
          <div className="auth-container">
            {/* Mobile logo */}
            <div className="mobile-brand">
              <Link to="/" className="brand-logo">
                <span className="brand-mark">S</span>

                <span className="brand-name">
                  Smart<span>Mart</span>
                </span>
              </Link>
            </div>

            {/* Header */}
            <header className="auth-header">
              <p className="auth-eyebrow">WELCOME BACK</p>

              <h2>Sign in to your account</h2>

              <p>Enter your details below to continue.</p>
            </header>

            {/* Login Form */}
            <form className="auth-form" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="form-field">
                <label htmlFor="email">Email address</label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="you@example.com"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="form-field">
                <div className="field-header">
                  <label htmlFor="password">Password</label>
                </div>

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
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />

                <span className="custom-checkbox" />

                <span className="remember-text">Remember me</span>
              </label>

              {/* Error */}
              {error && (
                <div className="auth-error" role="alert">
                  <span className="error-indicator">!</span>

                  <p>{error}</p>
                </div>
              )}

              {/* Submit */}
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? (
                  <>
                    <span className="loading-spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <span className="login-arrow">→</span>
                  </>
                )}
              </button>
            </form>

            {/* Register */}
            <div className="signup-section">
              <p>Don't have an account?</p>

              <Link to="/register">Create an account</Link>
            </div>

            {/* Back */}
            <Link to="/" className="back-to-store">
              <span>←</span>
              Back to store
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
