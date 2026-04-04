import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import './App.css';
import { AuthProvider } from './features/auth/auth.context';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './features/auth/hooks/use.auth';

const Home = () => {
  const { user, handleLogout } = useAuth();
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome {user?.username} to Job You Need!</h1>
      <p>You are successfully logged in.</p>
      <button onClick={handleLogout} className="auth-btn" style={{ width: '200px', margin: '20px auto' }}>Logout</button>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;