import express from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  createCatalog,
  getOrders,
} from "../controllers/seller.controller.js";

import { verifyToken } from "../utils/verifyUser.js";
import { authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post(
  "/create-product",
  verifyToken,
  authorizeRoles("seller"),
  createProduct
);
router.delete(
  "/delete-product/:id",
  verifyToken,
  authorizeRoles("seller"),
  deleteProduct
);
router.put(
  "/update-product/:id",
  verifyToken,
  authorizeRoles("seller"),
  updateProduct
);
router.post(
  "/create-catalog",
  verifyToken,
  authorizeRoles("seller"),
  createCatalog
);
router.get("/orders", verifyToken, authorizeRoles("seller"), getOrders);

export default router;
