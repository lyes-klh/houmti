const express = require('express');

const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  deleteAnyPost,
} = require('../controllers/postsController');
const { protect, restrictToAdmin } = require('../controllers/authController');

const router = express.Router();

router.use(protect);
router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);

module.exports = router;
