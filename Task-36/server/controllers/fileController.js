const File = require('../models/fileModel');


const uploadFile = async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      path: req.file.path
    });
    await file.save();
    res.status(201).json({ message: 'File uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'File upload failed' });
  }
};


const getFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch files' });
  }
};

module.exports = { uploadFile, getFiles };
