import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing-root">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          FitScore AI<span>.</span>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/analyze">Analyze</Link>
        </div>

        <div className="nav-actions">
          <Link to="/login">
            <button className="btn-outline">Login</button>
          </Link>
          <Link to="/upload">
            <button className="btn-primary">Get started</button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="badge">✨ Get your resume–job fit score instantly.</div>

          <h1>
            Measure your job fit <br />
            <span>before you apply.</span>
          </h1>

          <p className="hero-subtext">
            Upload your resume, paste a job description, and get an instant fit score
            with confidence insights.

          </p>

          <div className="hero-actions">
            <Link to="/upload">
              <button className="btn-primary">Upload Resume →</button>
            </Link>
            <Link to="/analyze">
              <button className="btn-primary">Try Analysis</button>
            </Link>
          </div>

          <p className="hero-foot">
            Built as a MERN + AI project
          </p>
        </div>
      </section>
    </div>
  );
}
