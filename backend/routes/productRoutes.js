const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const mongoose = require("mongoose");


// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Add a new product
router.post("/", async (req, res) => {
  try {
    console.log("Received data:", req.body); // Log incoming data

    // Destructure with correct field names
    const { 
      product_id, 
      name, 
      category, 
      price, 
      buying_price, 
      quantity, 
      unit, 
      expiry_date, 
      threshold_value 
    } = req.body;

    // Validate required fields
    if (!product_id || !name || !category || !price || !buying_price || !quantity || !unit || !expiry_date || !threshold_value) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Create new product
    const newProduct = new Product({ 
      product_id, 
      name, 
      category, 
      price, 
      buying_price, 
      quantity, 
      unit, 
      expiry_date, 
      threshold_value 
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "✅ Product added successfully!", product: savedProduct });

  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ message: "❌ Error adding product", error });
  }
});

// ✅ Get a product by ID
router.get("/:id", async (req, res) => {
  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update a product
router.put("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Delete a product
router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
