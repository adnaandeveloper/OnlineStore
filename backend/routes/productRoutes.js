import express from "express";
import {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  createProductReview,
} from "../controllers/productController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

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

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(admin, protect, deleteProduct);
router.route("/:id/reviews").post(protect, createProductReview);

export default router;
