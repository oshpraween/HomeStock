import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";
import logo from "../assets/logo.png";
import googleLogo from "../assets/google.png";
import smallLogo from "../assets/image.png";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
   
   
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:4000/user/register", formData);
      setSuccessMessage("Signup successful! Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="logo-container">
        <img src={logo} alt="HomeStock Logo" className="main-logo" />
      </div>
      <div className="register-box-container">
        <div className="register-box">
          <div className="login-header">
            <img src={smallLogo} alt="Small Logo" className="small-logo" />
          </div>

          <h2>Create an account</h2>
         

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your Full Name"
                required
              />
            </div>
          
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                required
              />
            </div>
            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Registering..." : "Get started"}
            </button>
            <button type="button" className="google-btn">
              <img src={googleLogo} alt="Google Logo" className="google-logo" />
              Sign up with Google
            </button>
            <p className="login-link">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
