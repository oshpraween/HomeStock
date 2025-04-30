const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  buying_price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  expiry_date: { type: String, required: true },
  threshold_value: { type: Number, required: true }
});

module.exports = mongoose.model("Product", ProductSchema);
