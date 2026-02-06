import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authApi from '../services/authApi';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const nav = useNavigate();

  const doLogin = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password: pwd };

      // POST /api/auth/login
      const resp = await authApi.post('/auth/login', body);

      const { token, user } = resp.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id);

      nav('/upload');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <>

      <div className="auth-wrapper">
        <div className="auth-card">
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">
            Login to continue analyzing resumes with AI
          </p>

          <form onSubmit={doLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-button">
              Login
            </button>
          </form>

          <div className="auth-footer">
            Don’t have an account?{' '}
            <Link to="/register">Create one</Link>
          </div>
        </div>
      </div>
    </>
  );
}
