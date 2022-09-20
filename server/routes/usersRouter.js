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

const notificationsRouter = require('../routes/notificationsRouter');

const { getMyPosts } = require('../controllers/postsController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);

// Protected routes
router.use(protect);
router.use('/my-profile/notifications', notificationsRouter);
router.post('/my-profile/updatePassword', updatePassword);
router.patch('/my-profile/updateMe', uploadAvatar, updateMe);
router.get('/my-profile/posts', getMyPosts);
router.get('/:id', getUserInfo);

// Admin-only routes
router.use(restrictToAdmin);
router.get('/', getAllUsers);
router.route('/:id').patch(updateAnyUser).delete(deleteAnyUser);

module.exports = router;
