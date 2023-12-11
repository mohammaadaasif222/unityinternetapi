import express from 'express';
import { google, signOut, register, login } from '../controllers/auth.controller.js';

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post('/google', google);
router.get('/signout', signOut)

export default router;