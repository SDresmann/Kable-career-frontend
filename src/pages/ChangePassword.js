import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { changePassword as apiChangePassword } from '../api';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) navigate('/login', { replace: true });
  }, [user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }
    setLoading(true);
    try {
      await apiChangePassword(currentPassword, newPassword);
      setSuccess('Your password was updated. You can keep using the app with your current session.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message || 'Could not change password');
    } finally {
      setLoading(false);
    }
  }

  if (!user) return null;

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
          <h1 className="auth-title">Change password</h1>
          <p className="auth-footer" style={{ marginTop: 0, marginBottom: '1.25rem' }}>
            Signed in as <strong>{user.email}</strong>
          </p>
          <form onSubmit={handleSubmit} className="auth-form">
            {error && <p className="auth-error" role="alert">{error}</p>}
            {success && <p className="auth-success" role="status">{success}</p>}
            <label className="auth-label">
              Current password
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="auth-input"
                required
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </label>
            <label className="auth-label">
              New password
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="auth-input"
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="At least 6 characters"
              />
            </label>
            <label className="auth-label">
              Confirm new password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-input"
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="Repeat new password"
              />
            </label>
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Updating…' : 'Update password'}
            </button>
          </form>
          <p className="auth-footer">
            <Link to="/">Back to workshops</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
