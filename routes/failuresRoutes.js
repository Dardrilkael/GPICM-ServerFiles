const express = require('express');
const path = require('path');
const { postFile } = require('../controllers/failuresController');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.text({ type: '*/*' }));

// Routes

router.post('/upload', postFile);
router.get('/download', (req, res) => {
    res.send("Hello from failuresRoutes.js");
});

module.exports = router;
