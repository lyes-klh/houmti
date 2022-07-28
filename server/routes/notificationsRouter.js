const express = require('express');

const {
  getUserNotifications,
  changeNotificationStatus,
} = require('../controllers/notificationsController');

const router = express.Router();

router.get('/', getUserNotifications);
router.patch('/:id', changeNotificationStatus);

module.exports = router;
