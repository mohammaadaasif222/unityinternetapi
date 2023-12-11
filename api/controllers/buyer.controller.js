import User from "../models/user.model.js";
import Catalog from "../models/catalog.model.js";
import { errorHandler } from "../utils/error.js";
import Order from "../models/order.model.js";

export const sellers = async (req, res, next) => {
  try {
    const sellers = await User.find({ type: "seller" });

    if (!sellers) return next(errorHandler(404, "User not found!"));

    res.status(200).json(sellers);
  } catch (error) {
    next(error);
  }
};

export const getSellerCatalog = async (req, res, next) => {
  try {
    const catalog = await Catalog.find({ sellerRef: req.params.id });
    res.status(200).json(catalog);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  const sellerId = req.params.id;
  const userId = req.user.id
  const {totalPrice, products} = req.body
  try {
    const order = await Order.create({seller:sellerId, user:userId, totalPrice:totalPrice, products:products});
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
