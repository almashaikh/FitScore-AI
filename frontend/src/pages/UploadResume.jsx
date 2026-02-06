import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (selected && selected.type !== 'application/pdf') {
      alert('Only PDF files are allowed');
      e.target.value = null;
      return;
    }

    setFile(selected);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please choose a PDF resume');

    const token = localStorage.getItem('token');
    if (!token) return alert('Please login first');

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append('resume', file);

      const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const resp = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: fd
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || 'Upload failed');
      }

      alert('Resume uploaded successfully');
      nav('/dashboard');

    } catch (err) {
      console.error('Upload failed:', err);
      alert(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-page">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600 }}>
          Upload Resume
        </h2>
        <p style={{ color: '#64748b', marginTop: 6 }}>
          Upload your resume as a PDF. It will be analyzed automatically using AI.
        </p>
      </div>

      {/* Upload card */}
      <form onSubmit={handleUpload}>
        <div
          style={{
            border: '1px dashed #cbd5e1',
            borderRadius: 16,
            padding: 32,
            textAlign: 'center',
            background: '#f8fafc'
          }}
        >
          <div style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}>
            Supported format: <strong>PDF only</strong>
          </div>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ marginBottom: 20 }}
          />

          {file && (
            <div
              style={{
                marginBottom: 20,
                fontSize: 14,
                color: '#0f172a'
              }}
            >
              Selected file: <strong>{file.name}</strong>
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Resume'}
          </button>
        </div>
      </form>

      {/* Info */}
      <div
        style={{
          marginTop: 24,
          fontSize: 13,
          color: '#64748b'
        }}
      >
        Your resume is securely stored and reused for all future job description analyses.
      </div>
    </div>
  );
}
