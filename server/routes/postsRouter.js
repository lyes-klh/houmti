const express = require('express');
const feedbackRouter = require('./feedbackRouter');
const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require('../controllers/postsController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.use(protect);
router.use('/:id/feedbacks', feedbackRouter);
router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);

module.exports = router;
