const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage});

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  console.log(file);
  res.status(200).json({success:'File uploaded successfully',file : file.filename});
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
