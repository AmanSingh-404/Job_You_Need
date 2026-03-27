import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import illustration from '../assets/secure-login.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });
      console.log('Login successful', response.data);
      navigate('/');
    } catch (err) {
      console.error('Login error', err);
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* Left Side (Form) */}
        <div className="auth-left">
          <div className="auth-header">
            <h1>Welcome back!</h1>
            <p>
              Build your career and boost your growth<br/>
              with <strong>Job You Need</strong>. Get started for free.
            </p>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="input-container">
              <input 
                type="email" 
                className="auth-input"
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className="input-container">
              <input 
                type={showPassword ? "text" : "password"} 
                className="auth-input"
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
                )}
              </button>
            </div>
            
            <div className="forgot-password">
              <Link to="/forgot">Forgot Password?</Link>
            </div>
            
            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? <div className="loader"></div> : 'Login'}
            </button>
          </form>
          
          <div className="auth-footer">
            Not a member? <Link to="/register" className="auth-link">Register now</Link>
          </div>
        </div>
        
        {/* Right Side (Illustration) */}
        <div className="auth-right">
          <img src={illustration} alt="Tuga's App Illustration" />
          <h2>
            Build your career and boost your growth with <strong>Job You Need</strong>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
