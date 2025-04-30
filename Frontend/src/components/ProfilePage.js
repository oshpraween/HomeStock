import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import '../styles/ProfilePage.css';
import Sidebar from "./sidebar"; // Adjust path if needed
import profilePic from "../assets/profile.png"; // Adjust path
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    email: '',
    fullName: '',
    nickName: '',
    gender: '',
    country: '',
    contactNo: '',
    occupation: '',
    profilePic: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('_id');
        const response = await fetch(`http://localhost:4000/user/getMyUser/${userId}`);
        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = (event) => {
    const { name, value } = event.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDelete = async () => {
    const userId = localStorage.getItem('_id');
    const confirmDelete = window.confirm('Are you sure you want to delete this profile?');
    if (confirmDelete) {
      const response = await fetch(`http://localhost:4000/user/deleteUser/${userId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        alert('Profile deleted successfully!');
        navigate('/login');
      } else {
        alert('Error deleting profile. Please try again.');
      }
    }
  };

  const handleSave = async () => {
    const userId = localStorage.getItem('_id');
    try {
      const response = await axios.put(`http://localhost:4000/user/updateUser/${userId}`, {
        fullName: customer.fullName,
        email: customer.email,
        nickName: customer.nickName,
        gender: customer.gender,
        country: customer.country,
        contactNo: customer.contactNo,
        occupation: customer.occupation,
        profilePic: customer.profilePic
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
      } else {
        alert('Error updating profile. Please try again.');
      }
    } catch (error) {
      console.error('Update failed:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="profile-card">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <h2>{customer.fullName}</h2>
          <p>{customer.email}</p>

          <div className="btn-group">
            <button className="edit-btn" onClick={handleSave}>Save</button>
            <button className="dlt-btn" onClick={handleDelete}>Delete</button>
          </div>

          <div className="profile-details">
            <div>
              <label>Full Name</label>
              <input type="text" name="fullName" value={customer.fullName} onChange={handleEdit} />
            </div>
            <div>
              <label>Nick Name</label>
              <input type="text" name="nickName" value={customer.nickName} onChange={handleEdit} />
            </div>
            <div>
              <label>Gender</label>
              <select name="gender" value={customer.gender} onChange={handleEdit}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label>Country</label>
              <select name="country" value={customer.country} onChange={handleEdit}>
                <option value="">Select Country</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Japan">Japan</option>
                <option value="China">China</option>
              </select>
            </div>
            <div>
              <label>Occupation</label>
              <input type="text" name="occupation" value={customer.occupation} onChange={handleEdit} />
            </div>
            <div>
  <label>Contact Number</label>
  <div className="phone-input">
    <select
      className="country-code"
      value={customer.contactNo?.split(' ')[0] || '+94'}
      onChange={(e) => {
        const code = e.target.value;
        const number = customer.contactNo?.split(' ').slice(1).join('') || '';
        setCustomer((prev) => ({
          ...prev,
          contactNo: `${code} ${number}`,
        }));
      }}
    >
      <option value="+94">🇱🇰 +94</option>
      <option value="+91">🇮🇳 +91</option>
      <option value="+1">🇺🇸 +1</option>
      <option value="+44">🇬🇧 +44</option>
      <option value="+61">🇦🇺 +61</option>
    </select>
    <input
      type="text"
      name="contactNo"
      value={customer.contactNo?.split(' ').slice(1).join(' ') || ''}
      onChange={(e) =>
        setCustomer((prev) => ({
          ...prev,
          contactNo: `${(customer.contactNo?.split(' ')[0] || '+94')} ${e.target.value}`,
        }))
      }
      placeholder="Enter number"
    />
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
