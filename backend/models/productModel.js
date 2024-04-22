import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String, // Corrected type to String
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String, // Corrected type to String
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String, // Corrected type to String
      required: true,
    },
    image: {
      type: String, // Corrected type to String
      required: true,
    },
    brand: {
      type: String, // Corrected type to String
      required: true,
    },
    category: {
      type: String, // Corrected type to String
      required: true,
    },
    description: {
      type: String, // Corrected type to String
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
