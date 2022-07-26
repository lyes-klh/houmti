const express = require('express');
const {
  getAllPostFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} = require('../controllers/feedbackController');

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllPostFeedback).post(createFeedback);
router.route('/:feedbackId').patch(updateFeedback).delete(deleteFeedback);

module.exports = router;
