import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Use Link for navigation
import axios from "axios"; // Import axios for API calls
import '../styles/Login.css'; // Ensure styles are imported
import logo from "../assets/logo.png"; // Main logo
import googleLogo from "../assets/google.png"; // Google logo
import smallLogo from "../assets/image.png"; // Small logo above login form

const Login = ({ onLogin }) => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Clear previous error messages

    try {
      // Send the login request to the backend
      const response = await axios.post("http://localhost:4000/user/login", {
        email: input,
        password: password,
      });

      // Handle successful login (token is returned in cookies)
      const { data } = response;

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("_id", data.id); // Store user ID in local storage
      // If you want to store user data in localStorage or state, you can do it here.
      // For example:
      // localStorage.setItem("user", JSON.stringify(data));
      
      // Set user as logged in (could use this to update global state or context)
     onLogin(data.role); 

      // Redirect to user dashboard
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Logo */}
      <div className="logo-container">
        <img src={logo} alt="HomeStock Logo" className="main-logo" />
      </div>

      {/* Right Side - Login Box */}
      <div className="login-box-container">
        <div className="login-box">
          <div className="login-header">
            <img src={smallLogo} alt="Small Logo" className="small-logo" />
            <h2>Log in to your account</h2>
          </div>
          <p>Welcome back! Please enter your details.</p>

          {/* Display error message if login fails */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={handleLogin} className="centered-form">
            <div className="input-group">
              <label>Email</label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>

            <div className="remember-forgot">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember for 30 days</label>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Sign in"}
            </button>

            <button className="google-btn">
              <img src={googleLogo} alt="Google Logo" className="google-logo" />
              Sign in with Google
            </button>
            <p className="login-link">
              Don’t have an account? <Link to="/register">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
