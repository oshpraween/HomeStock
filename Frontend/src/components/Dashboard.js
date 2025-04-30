import React from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import "../styles/dashboard.css";
import Sidebar from "./sidebar";
import quantityIcon from "../assets/Quantity.png";
import toBeWantIcon from "../assets/On.png";
import shopsIcon from "../assets/Suppliers.png";
import categoriesIcon from "../assets/Categories.png";

const salesData = [
  { name: "Jan", purchase: 50000, sales: 40000 },
  { name: "Feb", purchase: 55000, sales: 42000 },
  { name: "Mar", purchase: 48000, sales: 39000 },
  { name: "Apr", purchase: 47000, sales: 41000 },
  { name: "May", purchase: 49000, sales: 43000 },
  { name: "Jun", purchase: 52000, sales: 45000 },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="main-content">
        <h2 className="header">Dashboard</h2>
        <div className="grid-container">
          <div className="card">
            <h3><span className="info-text">Inventory Summary</span></h3>
            <p><img src={quantityIcon} alt="Quantity in Hand" className="info-icon" /> 
              <span className="info-text">Quantity in Hand: <strong>868</strong></span>
            </p>
            <p><img src={toBeWantIcon} alt="To Be Want" className="info-icon" /> 
              <span className="info-text">To Be Want: <strong>200</strong></span>
            </p>
          </div>
          <div className="card">
            <h3><span className="info-text">Product Summary</span></h3>
            <p><img src={shopsIcon} alt="Number of Shops" className="info-icon" /> 
              <span className="info-text">Number of Shops: <strong>31</strong></span>
            </p>
            <p><img src={categoriesIcon} alt="Categories" className="info-icon" /> 
              <span className="info-text">Categories: <strong>5</strong></span>
            </p>
          </div>
        </div>
        <div className="sales-chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
              <Bar dataKey="purchase" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
