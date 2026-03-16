import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { register } from '../api';
import './Login.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(email, password);
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link to="/" className="auth-logo">
          <span className="auth-logo-k">K</span>
          <span className="auth-logo-rest">able Academy</span>
        </Link>
      </header>
      <main className="auth-main">
        <div className="auth-card">
          <h1 className="auth-title">Create account</h1>
          <form onSubmit={handleSubmit} className="auth-form">
            {error && <p className="auth-error" role="alert">{error}</p>}
            <label className="auth-label">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
            <label className="auth-label">
              Password (min 6 characters)
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="••••••••"
              />
            </label>
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Creating account…' : 'Sign up'}
            </button>
          </form>
          <p className="auth-footer">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
