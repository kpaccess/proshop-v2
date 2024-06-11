import asyncHandler from "express-async-handler";
import Product from "../models/productModel";

// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products.length > 0) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc Fetch a product
// @route GET /api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res): Promise<void> => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
