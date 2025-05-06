const path = require('path');
const fs = require('fs');
const { loadMetadata, saveMetadata } = require('../utils/metadataHandler');

const fileDirectory = path.join(__dirname, '..', 'uploads/files');
const metadataPath = path.join(__dirname, '..', 'metadata.json');

// List files with metadata and render HTML
const getFileList = (req, res) => {
    if (!fs.existsSync(fileDirectory)) {
      fs.mkdirSync(fileDirectory, { recursive: true });
    }
    fs.readdir(fileDirectory, async (err, files) => {
        if (err) return res.status(500).send('Error listing files.');
        console.log('metadataPath', metadataPath);
        const metadata = loadMetadata(metadataPath);
        res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
    });
};

// Save file and update metadata
const uploadFile = (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');

    const metadata = loadMetadata(metadataPath);

    const name = req.body.fileName?.trim() || req.file.originalname;
    const description = req.body.description?.trim() || 'No description';
    const version = req.body.version?.trim() || 'Unknown';
    const githubUrl = req.body.githubUrl?.trim() || ''; // GitHub URL or other external link
    const uploadDate = new Date().toISOString();

    metadata[name] = {
        description,
        version,
        githubUrl,
        uploadDate
    };

    saveMetadata(metadataPath, metadata);

    res.redirect('/download');
};

// Serve file for download
const downloadFile = (req, res) => {
    const filePath = path.join(fileDirectory, req.params.filename);
    fs.stat(filePath, (err, stats) => {
        if (err) return res.status(404).send('File not found.');

        const stream = fs.createReadStream(filePath);
        res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);
        res.setHeader('Content-Length', stats.size);
        stream.pipe(res);
    });
};

// Return file list as JSON
const getFileListJson = (req, res) => {
    fs.readdir(fileDirectory, (err, files) => {
      if (err) return res.status(500).json({ error: 'Unable to list files.' });
  
      const metadata = loadMetadata(metadataPath);
      const existingFiles = new Set(files);
  
      // Filter metadata for entries that actually exist in the directory
      const fileList = Object.entries(metadata)
        .filter(([fileName]) => existingFiles.has(fileName))
        .map(([fileName, meta]) => ({
          name: fileName,
          url: `/download/${fileName}`, // URL for downloading the file
          githubUrl: meta.githubUrl || '', // GitHub URL or other external link
          description: meta.description || 'No description provided',
          version: meta.version || 'Unknown',
          uploadDate: meta.uploadDate || 'Unknown'
        }));
  
      res.json(fileList);
    });
  };

module.exports = {
    getFileList,
    uploadFile,
    downloadFile,
    getFileListJson
};
