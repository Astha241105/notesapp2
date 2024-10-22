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
  const [user, setUser] = useState(null); // Add user state
  const [error, setError] = useState(''); // Add error state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email && formData.password) {
      axios.post("https://notes-backend-x9sp.onrender.com/user/login", formData, { withCredentials: true })
        .then((response) => {
          console.log('Response:', response.data);
          if (response.data.success) {
            setUser(response.data.user); // Store user info in state
            navigate('/notes');
          }
        })
        .catch((error) => {
          if (error.response) {
            console.error('Error during login:', error.response.data);
            setError('Login failed. Please check your credentials.'); // Set error message
          }
        });
    } else {
      console.log('Email and password are required');
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
        <button type="submit">Login</button>
      </form>

      {user && (
        <div className="user-info">
          <h3>User Information</h3>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
    </div>
  );
};

export default Login;
