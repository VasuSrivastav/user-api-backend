import User from '../models/user.model.js';
import Post from '../models/post.model.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error in getAllUsers:', err);
    res.status(500).json({ error: err.message });
  }
};

export const getUserInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const postCount = await Post.countDocuments({ user: id });

    res.json({
      name: user.name,
      email: user.email,
      postCount,
    });
  } catch (err) {
    console.error('Error in getUserInfo:', err);
    res.status(500).json({ error: err.message });
  }
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User role updated successfully', user });
  } catch (err) {
    console.error('Error in updateUserRole:', err);
    res.status(500).json({ error: err.message });
  }
};