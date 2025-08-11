const mongoose = require("mongoose")
// const { Schema, model} = require('mongoose');


const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product Name is required"],
      trim: true,
    },
    brandName: {
      type: String,
      required: [true, "Product brand Name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
	  min: [0, "Price cannot be negative"],
      default: 0,
    },
    productStock: {
      type: Number,
      required: [true, "product quantity is required"],
	  min: [0, "quantity cannot be negative"],
      default: 0,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },
    imageURL: {
	  type: String,
	  required: [true, "Image is required"],
	},
    category: {
	  type: String,
	  required: [true, "Category is required"]
	},

  },
  {
    timestamps: true, 
  },
)



// Create and export the User model
const Product = mongoose.model("Product", ProductSchema)

module.exports = Product
