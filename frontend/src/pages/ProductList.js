import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import logo from "../assets/images/logo.png"; // Import the logo image

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setFadeOut(false);

      const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
      const removeTimer = setTimeout(() => {
        setMessage("");
        window.history.replaceState({}, document.title);
      }, 3000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [location]);

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product._id !== id));
        setMessage("Product deleted successfully");
        setFadeOut(false);

        setTimeout(() => setFadeOut(true), 2000);
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Shopping List", 14, 22);

    doc.setFontSize(12);
    doc.text("Product Name", 14, 30);
    doc.text("Price (Rs)", 70, 30);
    doc.text("Quantity", 120, 30);

    let y = 40;
    products.forEach((product) => {
      doc.text(product.name, 14, y);
      doc.text(product.price.toString(), 70, y);
      doc.text(product.quantity.toString(), 120, y);
      y += 10;
    });

    doc.save("shopping-list.pdf");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <div className="logo-container">
            <img src={logo} alt="HomeStock Logo" className="logo-image" />
          </div>
          <nav className="nav-links">
            <ul className="nav-group">
              <li className="active">Inventory</li>
              <li>Dashboard</li>
              <li>Alerts</li>
              <li>Profile</li>
              <li>Shopping List</li>
              <li>Manage Store</li>
            </ul>
          </nav>
        </div>
        <div className="bottom-links">
          <div className="sidebar-item">Settings</div>
          <div className="sidebar-item">Log Out</div>
        </div>
      </aside>

      <div className="content">
        <h2 className="text-center">Shopping List</h2>

        {message && (
          <div
            className={`alert alert-success text-center fade-out ${fadeOut ? "hide" : ""}`}
            role="alert"
          >
            {message}
          </div>
        )}

        <Link to="/add">
          <button className="btn btn-success mb-3">Add Product</button>
        </Link>

        <button onClick={generatePDF} className="btn btn-primary mb-3 ms-2">
          Download List
        </button>

        {/* Search bar with icon */}
        <div className="input-group mb-3">
          <span className="input-group-text" id="search-icon">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by product name..."
            aria-label="Search"
            aria-describedby="search-icon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price (Rs)</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button className="btn btn-danger btn-sm mx-2" onClick={() => deleteProduct(product._id)}>
                    Delete
                  </button>
                  <Link to={`/update/${product._id}`}>
                    <button className="btn btn-warning btn-sm">Update</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
