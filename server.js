// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');
const failuresRoutes = require('./routes/failuresRoutes');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 4500;

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.text({ type: 'text/*', limit: '100gb' }));
app.use('/', fileRoutes);
app.use('/failures', failuresRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});