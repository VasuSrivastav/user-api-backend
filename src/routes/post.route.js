import express from 'express';
import { body, validationResult } from 'express-validator';
import authenticateJWT from '../middlewares/auth.middleware.js';

import { addPost, deletePost, getPosts, updatePost } from "../controllers/post.controller.js";


const router = express.Router();

router.post(
  "/",
  [
    body("title", "Enter a Valid title name, min Length is 3 & max length is 25").isLength({
      min: 3,
      max: 25,
    }),
    body("bio", "Enter a Valid bio, min Length is 3 & max length is 30").isLength({
        min: 3,
        max: 30,
      }),
      body("description", "Enter a Valid description, min Length is 3 & max length is 50").isLength({
        min: 3,
        max: 50,
      }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authenticateJWT,
  addPost
);

router.get("/", authenticateJWT, getPosts);

router.put("/:id", authenticateJWT, updatePost);

router.delete("/:id", authenticateJWT, deletePost);




export default router;
