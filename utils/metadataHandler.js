const fs = require('fs');
const path = require('path');

// Ensure that the metadata file exists, and create it if not
const ensureMetadataFile = (metadataPath) => {
    if (!fs.existsSync(metadataPath)) {
        fs.writeFileSync(metadataPath, JSON.stringify({})); // Initialize with an empty object
    }
};

// Load the metadata from the file
const loadMetadata = (metadataPath) => {
    ensureMetadataFile(metadataPath);
    const data = fs.readFileSync(metadataPath, 'utf-8');
    return JSON.parse(data);
};

// Save updated metadata to the file
const saveMetadata = (metadataPath, metadata) => {
    console.log('Saving metadata to', metadataPath);
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2)); // Pretty print with 2 spaces
};

// Add new file metadata (version, date, etc.) when uploading
const addFileMetadata = (metadataPath, fileName, version, description, uploadDate) => {
    const metadata = loadMetadata(metadataPath);

    // Adding or updating file metadata
    metadata[fileName] = {
        version: version || 'Unknown', // Default to 'Unknown' if not provided
        description: description || 'No description provided', // Default to 'No description provided' if empty
        uploadDate: uploadDate || new Date().toISOString() // Automatically use current date if not provided
    };

    saveMetadata(metadataPath, metadata);
};

// Export the functions for use in other parts of your app
module.exports = {
    loadMetadata,
    saveMetadata,
    ensureMetadataFile,
    addFileMetadata
};
