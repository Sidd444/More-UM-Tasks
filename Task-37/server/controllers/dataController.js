const Data = require('../models/dataModel');

// POST /data
const addData = async (req, res) => {
  try {
    const { name, value, category } = req.body;
    const data = new Data({ name, value, category });
    await data.save();
    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add data' });
  }
};

// GET /aggregate
const getAggregatedData = async (req, res) => {
  try {
    const groupByCategory = await Data.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const averageValue = await Data.aggregate([
      { $group: { _id: null, averageValue: { $avg: '$value' } } }
    ]);

    const sortedData = await Data.aggregate([
      { $sort: { value: 1 } }
    ]);

    res.status(200).json({ groupByCategory, averageValue, sortedData });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch data' });
  }
};

module.exports = { addData, getAggregatedData };
