const express = require('express');
const {
  getAllPostFeedback,
  createFeedback,
  updateComment,
  deleteFeedback,
} = require('../controllers/feedbackController');

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllPostFeedback).post(createFeedback);
router.route('/:feedbackId').patch(updateComment).delete(deleteFeedback);

module.exports = router;
