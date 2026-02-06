import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authApi from '../services/authApi';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, password: pwd };
      await authApi.post('/auth/register', body);
      alert('Account created successfully. Please login.');
      nav('/login');
    } catch (err) {
      console.error('Register error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <>

      <div className="auth-wrapper">
        <div className="auth-card">
          <h2 className="auth-title">Create your account</h2>
          <p className="auth-subtitle">
            Get started with AI-powered resume analysis
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                placeholder="e.g. Almas Shaikh"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

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
                placeholder="Choose a secure password"
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-button">
              Create account
            </button>
          </form>

          <div className="auth-footer">
            Already have an account?{' '}
            <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>
    </>
  );
}
