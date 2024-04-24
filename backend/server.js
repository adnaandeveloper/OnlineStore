import express from "express";
import dotenv from "dotenv";
import { notFound, errorHanlder } from "./middleware/errorMiddleware.js";
dotenv.config();
import connectDB from "./config/db.js";
import products from "./data/products.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
//const port = 5001;
const port = process.env.PORT || 5001;
connectDB(); //Connect to MongoDB
const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound); //NotFound middleware my own
app.use(errorHanlder); //Error handler my own
app.listen(port, () => console.log(`Server running on port ${port}`));
