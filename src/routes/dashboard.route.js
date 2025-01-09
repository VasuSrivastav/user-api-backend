import express from 'express';
import { getAllUsers, getUserInfo, updateUserRole } from '../controllers/dashboard.controller.js';
import authenticateJWT from '../middlewares/auth.middleware.js';
import isAdmin from '../middlewares/admin.middleware.js';

const router = express.Router();

router.get('/', authenticateJWT, getAllUsers);
router.get('/:id', authenticateJWT, isAdmin, getUserInfo);
router.put('/:id/role', authenticateJWT, isAdmin, updateUserRole);

export default router;