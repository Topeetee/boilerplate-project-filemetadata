var express = require('express');
const multer = require('multer');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// const storage = multer.diskStorage({
//   destination: 'uploads/',
//   filename: function (req, file, cb) {
//     // Generate a unique file name
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const fileName = file.originalname + '-' + uniqueSuffix;
//     cb(null, fileName);
//   },
// });

// Configure Multer with the storage option
// const upload = multer({ storage });


var upload = multer({ dest: 'uploads/' });


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // File has been uploaded successfully
  try {
    const { originalname, mimetype, size } = req.file;
    res.json({ filename: originalname, type: mimetype, size });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the file' });
  }
});





const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
