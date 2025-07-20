const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { uploadFile }= require('../controller/uploadController');

router.post('/uploads', upload.single('file'), uploadFile);



module.exports = router;
