// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
const PORT = process.env.PORT || 4500;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', fileRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});