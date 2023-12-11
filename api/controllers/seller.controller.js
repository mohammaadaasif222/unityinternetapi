import Catalog from "../models/catalog.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import { errorHandler } from "../utils/error.js";

export const createCatalog = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const catelog = await Catalog.create({
      sellerRef: req.user.id,
      title,
      description,
    });

    return res.status(201).json({
      messege: "catalog created successfully",
      catelog,
    });
  } catch (error) {
    next(error);
  }
};

export const getSellerCatalog = async (req, res, next) => {
  if (req.params.id) {
    try {
      const catalog = await Catalog.find({ sellerRef: req.params.id });
      console.log(catalog);
      res.status(200).json(catalog);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "no catalog found!"));
  }
};

export const createProduct = async (req, res, next) => {
  const {
    catalogRef,
    productName,
    description,
    price,
    quantityAvailable,
    imageURL,
  } = req.body;
  try {
    const product = await Product.create({
      sellerRef: req.user.id,
      productName,
      catalogRef,
      description,
      price,
      quantityAvailable,
      imageURL,
    });

    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.sellerRef !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You cannot delete this product" });
    }

    await Product.findByIdAndDelete(productId);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const updatedFields = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.sellerRef !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You cannot update this product" });
    }

    Object.keys(updatedFields).forEach((key) => {
      if (product[key] !== undefined) {
        product[key] = updatedFields[key];
      }
    });

    await product.save();
    res.json({
      message: "Product updated successfully",
      updatedProduct: product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const Product = await Product.findById(req.params.id);
    if (!Product) {
      return next(errorHandler(404, "Product not found!"));
    }
    res.status(200).json(Product);
  } catch (error) {
    next(error);
  }
};

export const getSellerProducts = async (req, res, next) => {
  try {
    const Products = await Product.find({
      sellerRef: req.params.id,
    });

    return res.status(200).json(Products);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ seller: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
