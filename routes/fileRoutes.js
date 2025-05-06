const express = require('express');
const multer = require('multer');
const path = require('path');
const { getFileList, uploadFile, downloadFile, getFileListJson } = require('../controllers/fileController');

const router = express.Router();
const fileDirectory = path.join(__dirname, '..', 'uploads/files');

// Multer config
const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, fileDirectory),
    filename: (req, file, cb) => {
        const name = req.body.fileName || file.originalname;
        cb(null, name);
    }
});
const upload = multer({ storage });

// Routes
router.get('/download', getFileList);
router.post('/upload', upload.single('file'), uploadFile);
router.get('/download/:filename', downloadFile);
router.get('/api/files', getFileListJson);

module.exports = router;
