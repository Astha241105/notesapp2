import React, { useState } from 'react';
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom'; 
import './Registration.css';

const Newregistration = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false,
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      axios.post("https://notes-backend-x9sp.onrender.com/user/signup", formData)
        .then((response) => {
          console.log('Response:', response.data);
          console.log('Form submitted:', formData);
          navigate('/user/login'); 
        })
        .catch((error) => {
          console.error('Error during registration:', error);
        });
    } else {
      console.log('All fields are required');
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
            />
            Admin
          </label>
        </div>
        <button type="submit" id="reg">Register</button>
      </form>

      <p>Already registered? <Link to="/user/login">Login here</Link></p>
    </div>
  );
};

export default Newregistration;