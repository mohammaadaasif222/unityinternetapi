import express from 'express';
import {getSellerCatalog, sellers, createOrder} from '../controllers/buyer.controller.js'
import { verifyToken } from '../utils/verifyUser.js';
import {authorizeRoles} from '../middlewares/authMiddleware.js'


const router = express.Router();

router.get('/list-of-sellers', verifyToken, sellers);
router.get('/seller-catalog/:id', verifyToken, getSellerCatalog);
router.post('/create-order/:id', verifyToken, authorizeRoles('buyer'),createOrder);


export default router;
