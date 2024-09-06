const express = require('express');
const router = express.Router();
const { addData, getAggregatedData, getAllData, deleteData } = require('../controllers/dataController');

router.post('/data', addData);
router.get('/aggregate', getAggregatedData);
router.get('/data', getAllData);
router.delete('/data/:id', deleteData);

module.exports = router;
