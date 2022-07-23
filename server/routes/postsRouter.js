const express = require('express');

const { getAllPosts, createPost } = require('../controllers/postsController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.use(protect);
router.route('/').get(getAllPosts).post(createPost);

module.exports = router;
