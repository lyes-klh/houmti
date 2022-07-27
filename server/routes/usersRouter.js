const express = require('express');

const {
  signup,
  login,
  logout,
  protect,
  updatePassword,
  forgotPassword,
  resetPassword,
  restrictToAdmin,
} = require('../controllers/authController');

const {
  getUserInfo,
  updateMe,
  getAllUsers,
  updateAnyUser,
  deleteAnyUser,
  uploadAvatar,
} = require('../controllers/usersController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);

// Protected routes
router.use(protect);
router.post('/updatePassword', updatePassword);
router.get('/:id', getUserInfo);
router.patch('/updateMe', uploadAvatar, updateMe);

// Admin-only routes
router.use(restrictToAdmin);
router.get('/', getAllUsers);
router.route('/:id').patch(updateAnyUser).delete(deleteAnyUser);

module.exports = router;
