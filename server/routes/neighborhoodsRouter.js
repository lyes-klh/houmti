const express = require('express');

const { protect, restrictToAdmin } = require('../controllers/authController');
const {
  getAllNeighborhoods,
  createNeighborhood,
  updateNeighborhood,
  deleteNeighborhood,
} = require('../controllers/neighborhoodsController');

const router = express.Router();

router.route('/').get(getAllNeighborhoods);

router.use(protect);
router.use(restrictToAdmin);
router.route('/').post(createNeighborhood);
router.route('/:id').patch(updateNeighborhood).delete(deleteNeighborhood);

module.exports = router;
