import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(''); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();

    if (formData.email && formData.password) {
      try {
        const response = await axios.post('https://notes-backend-x9sp.onrender.com/user/login', {
          email: formData.email,  
          password: formData.password  
        }, { withCredentials: true });
  
        console.log(response.data);
  
        if (response.data.success) {
          localStorage.setItem('sessionid', response.data.data.sessionId);    
          console.log('Session ID:', response.data.data.sessionId);    
          navigate('/notes');  
        } else {
          setError('Login failed: No token received');
        }
      } catch (err) {
        console.error('Error during login:', err);
        if (err.response) {
          setError(err.response.data?.message || 'Invalid credentials');
        } else if (err.request) {
          setError('Network error. Please try again.');
        } else {
          setError('An error occurred. Please try again.');
        }
      }
    }
  }; 
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" id="log">Login</button>
      </form>

      {user && (
        <div className="user-info">
          <h3>User Information</h3>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>} 
    </div>
  );
};

export default Login;
