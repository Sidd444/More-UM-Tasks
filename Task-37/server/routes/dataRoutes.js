const express = require('express');
const { addData, getAggregatedData } = require('../controllers/dataController');
const router = express.Router();

router.post('/data', addData);
router.get('/aggregate', getAggregatedData);

module.exports = router;
