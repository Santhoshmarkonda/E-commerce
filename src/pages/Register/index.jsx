import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../services/api";

import "./index.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <main className="auth-layout">
        <section className="auth-brand-section">
          <div className="brand-content">
            <Link to="/" className="brand-logo">
              E-commerce
            </Link>

            <p className="brand-label">
              YOUR SHOPPING DESTINATION
            </p>

            <h1>
              Start your shopping
              <br />
              journey with us.
            </h1>

            <p className="brand-description">
              Create your account and discover
              products you'll love.
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

        <section className="auth-form-section">
          <div className="auth-card">
            <div className="auth-header">
              <p className="auth-label">
                CREATE YOUR ACCOUNT
              </p>

              <h2>Sign Up</h2>

              <p>
                Create an account and start shopping.
              </p>
            </div>

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="name">
                  Full name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password">
                  Confirm password
                </label>

                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  required
                />
              </div>

              {error && (
                <p className="auth-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="auth-button"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Already have an account?{" "}
                <Link to="/login">Login</Link>
              </p>
            </div>

            <Link to="/" className="back-home">
              ← Back to Store
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Register;
