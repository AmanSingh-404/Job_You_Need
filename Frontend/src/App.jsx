import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import './App.css';
import { AuthProvider } from './features/auth/auth.context';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './features/interview/pages/Home';
import Interview from './features/interview/pages/Interview';
import Landing from './features/interview/pages/Landing';
import { InterviewProvider } from './features/interview/interview.context';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InterviewProvider>
          <Routes>
            {/* Public landing page */}
            <Route path="/" element={<Landing />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Authenticated routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview/:interviewId"
              element={
                <ProtectedRoute>
                  <Interview />
                </ProtectedRoute>
              }
            />
          </Routes>
        </InterviewProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;