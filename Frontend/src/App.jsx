import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Default route to login for now */}
        <Route path="/" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;