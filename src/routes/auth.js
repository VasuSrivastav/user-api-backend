import express from 'express';
import authenticateJWT from '../middleware/authenticateJWT.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/auth-user', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;