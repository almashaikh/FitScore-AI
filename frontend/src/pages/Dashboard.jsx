import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5000';

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/resumes`);
      const data = await res.json();
      setResumes(data || []);
    } catch (err) {
      console.error('Failed to load resumes:', err);
      alert('Could not load resumes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-page">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600 }}>
          My Resumes
        </h2>
        <p style={{ color: '#64748b', marginTop: 6 }}>
          All resumes you have uploaded so far
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <p style={{ color: '#64748b' }}>
          Loading resumes...
        </p>
      )}

      {/* Empty state */}
      {!loading && resumes.length === 0 && (
        <div
          style={{
            padding: 32,
            border: '1px dashed #e2e8f0',
            borderRadius: 12,
            textAlign: 'center',
            color: '#64748b'
          }}
        >
          No resumes uploaded yet.
        </div>
      )}

      {/* Resume list */}
      {!loading && resumes.length > 0 && (
        <div
          style={{
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            overflow: 'hidden'
          }}
        >
          {resumes.map((r, index) => (
            <div
              key={r._id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom:
                  index !== resumes.length - 1
                    ? '1px solid #e2e8f0'
                    : 'none'
              }}
            >
              {/* File info */}
              <div>
                <div style={{ fontWeight: 500 }}>
                  {r.originalName || r.filename}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: '#64748b',
                    marginTop: 4
                  }}
                >
                  Uploaded on {new Date(r.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Status */}
              <div
                style={{
                  fontSize: 13,
                  padding: '6px 12px',
                  background: '#f1f5f9',
                  borderRadius: 999,
                  color: '#475569'
                }}
              >
                Uploaded
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
