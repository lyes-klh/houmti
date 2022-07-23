const express = require('express');
const cityModel = require('../models/cityModel');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const newCity = await cityModel.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { newCity },
  });
});

module.exports = router;
