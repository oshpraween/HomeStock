import React, { useState ,useEffect} from 'react';
import './AdminDashboard.css';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';

const AdminDashboard = ({ customers, setCustomers }) => {

  useEffect(() => {
    // Fetch user data from the backend when the component mounts
    const fetchUserData = async () => {
      try {
        // Replace ':id' with the actual user ID you want to fetch
        // You can get the user ID from local storage or context if needed
        const userId = localStorage.getItem('_id'); // Example of getting user ID from local storage
        const response = await fetch(`http://localhost:4000/user/getUsers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setCustomers(data); // Set the fetched user data to state
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      }
    fetchUserData(); // Call the function to fetch user data
  }, []); // Empty dependency array to run only once when the component mounts




  const [newCustomer, setNewCustomer] = useState({
    _id:'',
    fullName: '',
    nickName: '',
    gender: '',
    country: '',
    occupation: '',
    contactNo: '',
    email: '',  // New email field
    createdAt: '', // New field for registration date and time
  });

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState('');

  // Toggle form visibility
  const openForm = () => setShowForm(true);
  const closeForm = () => {
    setShowForm(false);
    setNewCustomer({
      fullName: '',
      nickName: '',
      gender: '',
      country: '',
      occupation: '',
      contactNo: '',
      email: '',  // Reset email field when closing the form
      createdAt: '',
    });
    setIsEditing(false);
    setEditIndex(null);
  };

  // Add new customer
  const handleAddCustomer = () => {
    // Check if any of the fields are empty
    if (
      !newCustomer.fullName ||
      !newCustomer.nickName ||
      !newCustomer.gender ||
      !newCustomer.country ||
      !newCustomer.occupation ||
      !newCustomer.contactNo ||
      !newCustomer.email // Check if email is filled
    ) {
      alert('Please fill all fields.');
      return;
    }

    const createdAt = new Date().toLocaleString(); // Capture registration date and time
    const newCustomerData = { ...newCustomer, createdAt };

    setCustomers((prevCustomers) => [...prevCustomers, newCustomerData]);
    closeForm();
  };

  // Edit customer
  const handleEditCustomer = (index) => {
    setNewCustomer(customers[index]);
    setIsEditing(true);
    setEditIndex(index);
    setShowForm(true);
  };

  // Save edited customer
  const handleSaveCustomer = () => {
    if (
      !newCustomer.fullName ||
      !newCustomer.nickName ||
      !newCustomer.gender ||
      !newCustomer.country ||
      !newCustomer.occupation ||
      !newCustomer.contactNo ||
      !newCustomer.email // Check if email is filled
    ) {
      alert('Please fill all fields.');
      return;
    }

    setCustomers((prevCustomers) =>
      prevCustomers.map((customer, index) =>
        index === editIndex ? newCustomer : customer
      )
      
    );
    const response= axios.put(`http://localhost:4000/user/updateUser/${newCustomer._id}`, newCustomer)
    if(response) {
      alert('Customer updated successfully!');
      closeForm();
    }
    else {  
      alert('Error updating customer. Please try again.');
    }
  
   
  };

  // Delete customer
  const handleDeleteCustomer = (index) => {
    setCustomers(customers.filter((_, idx) => idx !== index));

    const response = axios.delete(`http://localhost:4000/user/deleteUser/${customers[index]._id}`)
    if(response) {
      alert('Customer deleted successfully!');
    }
    else {
      alert('Error deleting customer. Please try again.');
    }
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Customer List', 20, 10);

    autoTable(doc, {
      head: [
        [
          'ID',
          'Full Name',
          'Nick Name',
          'Gender',
          'Country',
          'Occupation',
          'Contact Number',
          'Email',  // Add Email column in the PDF
          'Registration Date',
        ],
      ],
      body: customers.map((customer, index) => [
        index + 1,
        customer.fullName,
        customer.nickName,
        customer.gender,
        customer.country,
        customer.occupation,
        customer.contactNo,
        customer.email,  // Include email in the table
        customer.createdAt,
      ]),
    });

    doc.save('Customer_List.pdf');
  };

  // Sorting customers based on filter
  const sortedCustomers = [...customers].sort((a, b) => {
    if (filter === 'name') {
      return a.fullName.localeCompare(b.fullName);
    }
    return 0;
  });

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
      </div>

      <div className="top-controls">
        <button className="add-btn" onClick={openForm}>Add New Customer</button>
        <select className="filter-select" onChange={(e) => setFilter(e.target.value)}>
          <option value="">Filter By</option>
          <option value="name">A-Z</option>
          <option value="name-desc">Z-A</option>
    
          
        </select>
        <button className="pdf-btn" onClick={generatePDF}>Download PDF</button>
      </div>

      {/* Add/Edit Customer Form */}
      {showForm && <div className="overlay" onClick={closeForm}></div>}
      {showForm && (
        <div className="form-container">
          <h4>{isEditing ? 'Edit Customer' : 'Add New Customer'}</h4>
          <input
            type="text"
            placeholder="Full Name"
            value={newCustomer.fullName}
            onChange={(e) => setNewCustomer({ ...newCustomer, fullName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nick Name"
            value={newCustomer.nickName}
            onChange={(e) => setNewCustomer({ ...newCustomer, nickName: e.target.value })}
          />
          <select
            value={newCustomer.gender}
            onChange={(e) => setNewCustomer({ ...newCustomer, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Country"
            value={newCustomer.country}
            onChange={(e) => setNewCustomer({ ...newCustomer, country: e.target.value })}
          />
          <input
            type="text"
            placeholder="Occupation"
            value={newCustomer.occupation}
            onChange={(e) => setNewCustomer({ ...newCustomer, occupation: e.target.value })}
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={newCustomer.contactNo}
            onChange={(e) => setNewCustomer({ ...newCustomer, contactNo: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newCustomer.email}  // Bind email field
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          />
          <div className="form-buttons">
            <button className="save-btn" onClick={isEditing ? handleSaveCustomer : handleAddCustomer}>
              {isEditing ? 'Save Customer' : 'Add Customer'}
            </button>
            <button className="cancel-btn" onClick={closeForm}>Cancel</button>
          </div>
        </div>
      )}

      {/* Customer Table */}
      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Nick Name</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Occupation</th>
            <th>Contact Number</th>
            <th>Email</th> {/* Add Email column */}
            <th>Registration Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedCustomers.map((customer, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{customer.fullName}</td>
              <td>{customer.nickName}</td>
              <td>{customer.gender}</td>
              <td>{customer.country}</td>
              <td>{customer.occupation}</td>
              <td>{customer.contactNo}</td>
              <td>{customer.email}</td> {/* Display email */}
              <td>{customer.createdAt}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditCustomer(index)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteCustomer(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
