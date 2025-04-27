const express = require('express');
const router = express.Router();
const { auth, isVerified } = require('../middleware/auth');
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost
} = require('../controllers/postController');
const { body } = require('express-validator');

// Validation middleware
const postValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required')
];

// Public routes
router.get('/', getAllPosts);
router.get('/:id', getPost);

// Protected routes
router.post('/', auth, isVerified, postValidation, createPost);
router.put('/:id', auth, isVerified, postValidation, updatePost);
router.delete('/:id', auth, isVerified, deletePost);

module.exports = router; 