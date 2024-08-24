const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Please enter product's description"]
  },
  price: {
    type: Number,
    required: [true, "Please enter the product's price"],
    MaxLength: [8, "Price should not exceed 8 characters"]
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id:
      {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    require: [true, "Please enter product category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    MaxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,

      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      }
    }

  ],
  user: {
    // This field in the product schema refers to the user who created the product
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now

  }

}
)

module.exports = mongoose.model("Product", productSchema);