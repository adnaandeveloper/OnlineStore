import express from "express";
import products from "../data/products.js";
import asyncHanlder from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import {
  getProductById,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();
/*
router.get(
  "/",
  asyncHanlder(async (req, res) => {
    const products = await Product.find({}); // fetches alle products
    res.json(products);
  })
);
router.get(
  "/:id",
  asyncHanlder(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Resourse not found");
    }
    //res.status(404).json({ message: "Product not found" });
  })
);

*/

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
