import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import productRoutes from "./routes/productRoutes";
import products from "./data/products";

connectDB();
const app = express();

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/products", productRoutes);
