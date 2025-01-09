import express from 'express';
import { registerUser, loginUser , logoutUser, googleSignIn } from '../controllers/auth.controller.js';
import { body, param, validationResult } from 'express-validator';


const router = express.Router();


router.post('/register', [
  body('name','Enter a Valid name, min Length is 3').isLength({ min: 3 }),
  body('email', 'Enter a Valid email').isEmail(),
  body('password', 'Enter a Valid password, min length is 6').isLength({ min: 6 }),
],(req , res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}, registerUser);

router.post('/login', [
  body('email','Enter a Valid email').isEmail(),
  body('password','Invalid credential ').notEmpty(),
],(req , res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}, loginUser);

// logout
router.get('/logout', logoutUser);

// Google sign-in route
router.post('/google-signin', googleSignIn);

// Session management route
// router.get('/session', getSession);

export default router;
