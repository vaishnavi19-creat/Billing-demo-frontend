import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { FaFacebook, FaGoogle, FaUser, FaLock } from 'react-icons/fa';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      // Redirect or handle successful login as needed
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleForgotPassword = () => {
    // Placeholder for forgot password logic (redirect or modal)
    console.log('Forgot password clicked');
    window.location.href = '/forgot-password';
  };

  const handleFacebookLogin = () => {
    // Placeholder for Facebook OAuth logic
    console.log('Facebook login clicked');
    // Here, you could trigger a Facebook OAuth process
  };

  const handleGoogleLogin = () => {
    // Placeholder for Google OAuth logic
    console.log('Google login clicked');
    // Here, you could trigger a Google OAuth process
  };

  const handleSignUp = () => {
    // Placeholder for sign-up navigation
    console.log('Sign-up clicked');
    window.location.href = '/sign-up';
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <div className="login-form">
          <label>Username</label>
          <div className="input-container">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Type your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
          </div>

          <label>Password</label>
          <div className="input-container">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Type your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>

          <div className="forgot-password" onClick={handleForgotPassword}>
            Forgot password?
          </div>

          <button onClick={handleLogin} className="login-button">LOGIN</button>

          <p className="social-text">Or Sign Up Using</p>
          <div className="social-icons">
            <FaFacebook className="social-icon" onClick={handleFacebookLogin} />
            <FaGoogle className="social-icon" onClick={handleGoogleLogin} />
          </div>

          <p className="signup-text">
            Or Sign Up Using <span className="signup-link" onClick={handleSignUp}>SIGN UP</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;























