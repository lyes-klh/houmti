const express = require('express');

const { protect, restrictToAdmin } = require('../controllers/authController');
const {
  getAllCities,
  createCity,
  updateCity,
  deleteCity,
} = require('../controllers/citiesController');

const router = express.Router();

router.use(protect);
router.route('/').get(getAllCities);

router.use(restrictToAdmin);
router.route('/').post(createCity);
router.route('/:id').patch(updateCity).delete(deleteCity);

module.exports = router;
