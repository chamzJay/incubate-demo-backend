const mongoose = require("mongoose");

var ProductSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

var Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
