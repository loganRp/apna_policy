const { uploadFile } = require('../services/uploadService');
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No file uploaded');
    let data = req.file;
    let result = await uploadFile(data)
    return res.status(200).json({
        message : 'File uploaded',
        data : result
    })
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
