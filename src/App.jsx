import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/Home';
import AdminPortal from './pages/AdminPortal';
import AdminLogin from './pages/AdminLogin';
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Secret Admin Credentials Gate */}
          <Route path="/0x-admin-gate" element={<AdminLogin />} />

          {/* Employee/Staff Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'operations_manager', 'billing', 'payment', 'ar_denial']} />}>
            <Route path="/staff-access" element={<Dashboard />} />
          </Route>

          {/* Hidden Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/0x-sec-ops-v9" element={<AdminPortal />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
