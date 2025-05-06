// Serve file for download
const fs = require('fs');
const path = require('path');

const postFile = ('/upload', (req, res) => {
  
    console.log('--- Incoming Request ---');
    console.log('Headers:', req.headers);
    //console.log('Body:', req.body);
    console.log('------------------------');
  


  

    const fileName = req.headers['x-filename'] || 'uploaded.csv';
    const filePath = path.join(__dirname, '..', 'uploads/backup', fileName);

    filesDir = path.join(__dirname, '..', 'uploads/backup');
    // Verifica se o diretório existe, senão cria
    if (!fs.existsSync(filesDir)) {
      fs.mkdirSync(filesDir, { recursive: true });
    }

    const csvData = req.body;
    
    if (!fileName) {
        return res.status(400).send('Missing x-filename header');
      }
    
      if (!csvData) {
        return res.status(400).send('No file content received');
      }

      fs.writeFile(filePath, csvData, (err) => {
    if (err) {
      console.error('❌ Error saving file:', err);
      return res.status(500).send('Error saving file');
    }

    console.log(`✅ File saved: ${filePath}`);
    res.status(200).send(`File saved as ${fileName}`);
  });

  });





  

module.exports = {postFile};