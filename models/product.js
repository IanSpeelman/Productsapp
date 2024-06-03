const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true,
      },
      price: {
            type: Number,
            required: true,
      },
      category: {
            type: String,
            enum: ["vegetable", "fruit", "dairy"]
      }
})

const Product = new mongoose.model("Product", productSchema)

module.exports = Product;