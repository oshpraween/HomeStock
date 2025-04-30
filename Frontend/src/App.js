import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProfilePage from "./components/ProfilePage";
import "./index.css";


const App = () => {
  const [customers, setCustomers] = useState([]);
  const [userType, setUserType] = useState('user');

  const handleRegister = (customerData) => {
    setCustomers([...customers, customerData]);
  };

  const handleLogin = (role) => {
    setUserType(role);
  };

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login customers={customers} onLogin={handleLogin} />} />
        <Route path="/login" element={<Login customers={customers} onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route 
          path="/dashboard" 
          element={
            userType === "user" ? (
              <Dashboard />
            ) : userType === "admin" ? (
              <AdminDashboard customers={customers} setCustomers={setCustomers} />
            ) : (
              <h3>Access Denied</h3>
            )
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
