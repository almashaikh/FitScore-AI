import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const nav = useNavigate();
  const token = localStorage.getItem('token');

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    nav('/login');
  }

  return (
    <header className="app-header">
      <div className="app-header-inner">
        {/* LEFT: Brand */}
        <Link to="/" className="brand">
          <div className="brand-logo">RR</div>
          <div className="brand-text">
            <div className="brand-title">ResumeRanker</div>
            <div className="brand-subtitle">Resume · JD · AI</div>
          </div>
        </Link>

        {/* RIGHT: Navigation */}
        <nav className="app-nav">
          <Link to="/upload">Upload</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/analyze">Analyze</Link>

          {!token ? (
            <>
              <Link to="/login" className="nav-button ghost">
                Login
              </Link>
              <Link to="/register" className="nav-button primary">
                Register
              </Link>
            </>
          ) : (
            <button onClick={logout} className="nav-button ghost">
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
