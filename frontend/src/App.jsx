import { Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

import UploadResume from './pages/UploadResume';
import Dashboard from './pages/Dashboard';
import Analyze from './pages/Analyze';

export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* App pages */}
      <Route path="/upload" element={<UploadResume />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analyze" element={<Analyze />} />
    </Routes>
  );
}
