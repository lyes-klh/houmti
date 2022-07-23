const express = require('express');

const {
  signup,
  login,
  logout,
  protect,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);

router.use(protect);

router.post('/updatePassword', updatePassword);

module.exports = router;
