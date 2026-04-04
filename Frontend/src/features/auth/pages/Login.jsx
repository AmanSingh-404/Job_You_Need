import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import illustration from '../../../assets/secure-login.png';
import { useAuth } from '../hooks/use.auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {loading, handleLogin} = useAuth();
  const {email, setEmail} = useState('');
  const {password, setPassword} = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a token in the URL (from Google Auth redirect)
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      console.log('Google login successful, passing token:', token);
      localStorage.setItem('token', token);
      navigate('/');
    }
  }, [navigate]);

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
          
          <div className="auth-divider">or</div>
          
          <a href="http://localhost:3000/auth/google" className="google-btn">
            <svg className="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Sign in with Google
          </a>
          
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
