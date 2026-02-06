import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="hero-shell">
      <div className="hero-inner">
        {/* Left side: main marketing text */}
        <section className="hero-left">
          <div className="hero-badge">
            <span className="badge-pill">AI-powered</span>
            <span className="badge-text">Tailor your resume for every job</span>
          </div>

          <h1 className="hero-title">
            Land your dream job with
            <span className="hero-highlight"> AI-powered resumes.</span>
          </h1>

          <p className="hero-subtitle">
            Upload your resume, paste a Job Description and get a fit score, matched skills
            and concrete suggestions – before you hit “Apply”.
          </p>

          <div className="hero-actions">
            <Link to="/upload">
              <button className="btn-primary">Upload Resume</button>
            </Link>
            <Link to="/analyze">
              <button className="btn-ghost">Try a JD analysis</button>
            </Link>
          </div>

          <div className="hero-meta">
            <span className="dot-online" />
            <span className="hero-meta-text">
              Built as a MERN + AI learning project • Perfect for placement prep
            </span>
          </div>
        </section>

        {/* Right side: fake resume preview card */}
        <section className="hero-right">
          <div className="resume-card">
            <div className="resume-card-header">
              <div className="avatar-circle">A</div>
              <div>
                <div className="resume-name">Almas Shaikh</div>
                <div className="resume-role">Full-Stack Developer</div>
              </div>
              <div className="fit-pill">
                <span className="fit-label">Fit score</span>
                <span className="fit-value">82%</span>
              </div>
            </div>

            <div className="resume-section">
              <div className="resume-section-title">Key Skills match</div>
              <div className="resume-tags">
                <span className="tag tag-good">React</span>
                <span className="tag tag-good">Node.js</span>
                <span className="tag tag-good">MongoDB</span>
                <span className="tag tag-bad">AWS</span>
              </div>
            </div>

            <div className="resume-section">
              <div className="resume-section-title">AI suggestions</div>
              <ul className="resume-suggestions">
                <li>Add a project that highlights REST APIs with Express.</li>
                <li>Mention any cloud exposure (AWS / GCP) in Skills.</li>
                <li>Quantify impact: e.g. “Improved page load time by 30%”.</li>
              </ul>
            </div>

            <div className="resume-footer-hint">
              This is just a preview card. Your real analysis will be based on your resume + JD.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
