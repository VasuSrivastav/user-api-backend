import express from 'express';
import { getAllUsers, getUserInfo, updateUserRole } from '../controllers/dashboard.controller.js';
import authenticateJWT from '../middlewares/auth.middleware.js';
import isAdmin from '../middlewares/admin.middleware.js';

const router = express.Router();

router.get('/', authenticateJWT, getAllUsers);
router.get('/:id', authenticateJWT,  getUserInfo);
router.put('/:id/role', authenticateJWT, updateUserRole);

export default router;