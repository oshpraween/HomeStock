import React from "react";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";
import topPhoto from "../assets/Topphoto.png";
import homeIcon from "../assets/Home.png";
import inventoryIcon from "../assets/Inventory.png";
import alertsIcon from "../assets/Report.png";
import profileIcon from "../assets/Group.png";
import shoppingIcon from "../assets/Order.png";
import manageStoreIcon from "../assets/ManageStore.png";
import settingsIcon from "../assets/Settings.png";
import logoutIcon from "../assets/LogOut.png";


const Sidebar = () => {
  return (
     <div className="sidebar">
            <div className="sidebar-header">
              <img src={topPhoto} alt="HomeStock Logo" className="logo" />
            </div>
            <ul className="sidebar-menu">
              <li className="active">
                <Link to="/dashboard" className="active-link">
                  <img src={homeIcon} alt="Dashboard" className="menu-icon" /> 
                  <span className="menu-text">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/inventory">
                  <img src={inventoryIcon} alt="Inventory" className="menu-icon" /> 
                  <span className="menu-text">Inventory</span>
                </Link>
              </li>
              <li>
                <Link to="/alerts">
                  <img src={alertsIcon} alt="Alerts" className="menu-icon" /> 
                  <span className="menu-text">Alerts</span>
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <img src={profileIcon} alt="Profile" className="menu-icon" /> 
                  <span className="menu-text">Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/shopping-list">
                  <img src={shoppingIcon} alt="Shopping List" className="menu-icon" /> 
                  <span className="menu-text">Shopping List</span>
                </Link>
              </li>
              <li>
                <Link to="/manage-store">
                  <img src={manageStoreIcon} alt="Manage Store" className="menu-icon" /> 
                  <span className="menu-text">Manage Store</span>
                </Link>
              </li>
            </ul>
            <div className="sidebar-bottom">
              <ul  className="sidebar-menu">
    <li>
    <Link to="/settings" >
                <img src={settingsIcon} alt="Settings" className="menu-icon" /> 
                <span className="menu-text">Settings</span>
              </Link>
    </li>
    <li>
    <Link to="/logout" >
                <img src={logoutIcon} alt="Logout" className="menu-icon" /> 
                <span className="menu-text">Logout</span>
              </Link>
    </li>
              </ul>
              
             
            </div>
          </div>
  );
};

export default Sidebar;
