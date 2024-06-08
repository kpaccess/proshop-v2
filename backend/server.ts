import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import products from "./data/products";

connectDB();
const app = express();

const port = process.env.PORT || 3001;

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
