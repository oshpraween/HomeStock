import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf"; // Import jsPDF

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then(() => setProducts(products.filter((product) => product._id !== id)))
      .catch((error) => console.error("Error deleting product:", error));
  };

  // Function to generate the PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Adding Title
    doc.setFontSize(18);
    doc.text("Shopping List", 14, 22);
    
    // Adding Table Headers
    doc.setFontSize(12);
    doc.text("Product Name", 14, 30);
    doc.text("Price ($)", 70, 30);
    doc.text("Quantity", 120, 30);
    
    // Adding Table Content
    let y = 40;  // Initial y position for the table content
    products.forEach((product) => {
      doc.text(product.name, 14, y);
      doc.text(product.price.toString(), 70, y);
      doc.text(product.quantity.toString(), 120, y);
      y += 10;  // Move to the next row
    });

    // Save the PDF
    doc.save("shopping-list.pdf");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Shopping List</h2>
      <Link to="/add">
        <button className="btn btn-success mb-3">Add Product</button>
      </Link>

      <button onClick={generatePDF} className="btn btn-primary mb-3">
        Download PDF
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price ($)</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm mx-2"
                  onClick={() => deleteProduct(product._id)}
                >
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
  );
}

export default ProductList;
