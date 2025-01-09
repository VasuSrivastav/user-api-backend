import { validationResult } from 'express-validator';
import Post from '../models/post.model.js';

export const addPost = async (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { title, bio, description } = req.body;
      
        // if (!title || !bio  || !description) {
        //   return res.status(400).json({ message: 'All fields are required' });
        // }
      
        try {
          const post = new Post({
            title,
            bio,
            description,
            user: req.user.id,
          });
          await post.save();
          res.status(201).json(post);
        } catch (err) {
            console.error('Error in Add Post:', err); 
          res.status(500).json({ error: err.message });
        }
      };

export const getPosts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    
    try {
        const posts = await Post.find({ user: req.user.id })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
        res.json(posts);
    } catch (err) {
      console.error('Error in Get Posts:', err); 
        res.status(500).json({ error: err.message });
    }
    };

export const updatePost = async (req, res) =>{
  
  const { id } = req.params;
  const { title, bio, description } = req.body;

  if (!title || !bio || !description) {
    return res.status(400).json({ message: 'All fields are empty' });
  }
  try {
    const post = await Post.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, bio, description },
      { new: true }
    );

    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error('Error in Update Post:', err); 
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOneAndDelete({ _id: id, user: req.user.id });

    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('error in Deleting Post',err)
    res.status(500).json({ error: err.message });
  }
};

