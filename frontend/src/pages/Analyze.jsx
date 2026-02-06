import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5000';

export default function Analyze() {
  const [resumes, setResumes] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [jd, setJd] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/resumes`);
      const data = await res.json();
      setResumes(data || []);
      if (data && data.length > 0) {
        setSelectedId(data[0]._id);
      }
    } catch (err) {
      console.error('Failed to load resumes:', err);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!resumeText.trim()) {
      alert('Please paste resume text for accurate analysis');
      return;
    }

    if (!jd.trim()) {
      alert('Please paste Job Description');
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          resumeId: selectedId, // optional reference
          resumeText,           // PRIMARY analysis input
          jdText: jd
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data);
    } catch (err) {
      console.error('Analyze error:', err);
      alert(err.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceStyle = (confidence) => {
    switch (confidence) {
      case 'Excellent':
        return { color: '#16a34a', background: '#dcfce7' };
      case 'High':
        return { color: '#15803d', background: '#bbf7d0' };
      case 'Medium':
        return { color: '#92400e', background: '#fde68a' };
      default:
        return { color: '#7c2d12', background: '#fed7aa' };
    }
  };

  return (
    <div className="app-page">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600 }}>
          Analyze Resume
        </h2>
        <p style={{ color: '#64748b', marginTop: 6, maxWidth: 600 }}>
          For best accuracy, paste your resume text directly.
          PDF uploads are supported for storage, but design-heavy resumes
          may reduce extraction quality.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleAnalyze}>
        {/* Resume reference (secondary) */}
        {resumes.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 500, fontSize: 14 }}>
              Uploaded Resume (reference)
            </label>
            <select
              value={selectedId}
              onChange={e => setSelectedId(e.target.value)}
              style={{ marginTop: 6 }}
            >
              {resumes.map(r => (
                <option key={r._id} value={r._id}>
                  {r.originalName || r.filename}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Resume text (PRIMARY) */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 600, fontSize: 14 }}>
            Paste Resume Text <span style={{ color: '#16a34a' }}>(Recommended)</span>
          </label>
          <textarea
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
            placeholder="Paste the full resume text here for highest accuracy"
            style={{
              height: 180,
              marginTop: 6,
              border: '2px solid #bbf7d0',
              background: '#f0fdf4'
            }}
          />
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
            Tip: Copy text from Word / Google Docs / LinkedIn PDF view
          </div>
        </div>

        {/* Job Description */}
        <div style={{ marginBottom: 28 }}>
          <label style={{ fontWeight: 500, fontSize: 14 }}>
            Job Description
          </label>
          <textarea
            value={jd}
            onChange={e => setJd(e.target.value)}
            placeholder="Paste job description here"
            style={{ height: 160, marginTop: 6 }}
          />
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="result-box" style={{ marginTop: 36 }}>
          <h3 style={{ fontWeight: 600 }}>
            Match Result
          </h3>

          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              marginTop: 12,
              color: '#0f172a'
            }}
          >
            {result.score}%
          </div>

          {result.confidence && (
            <div
              style={{
                display: 'inline-block',
                marginTop: 10,
                padding: '4px 12px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                ...getConfidenceStyle(result.confidence)
              }}
            >
              {result.confidence} Match
            </div>
          )}

          <div
            style={{
              marginTop: 10,
              fontSize: 14,
              color: '#64748b'
            }}
          >
            Method: {result.method}
          </div>

          {result.matchedSkills && result.matchedSkills.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>
                Matched Skills
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {result.matchedSkills.map((s, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '4px 10px',
                      background: '#e0f2fe',
                      color: '#0369a1',
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 500
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
