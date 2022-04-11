var express = require('express');
const sharp = require('sharp');
const multer = require('multer');
const bodyParser = require('body-parser');

var storagePhotos = multer.diskStorage({
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = '';
    if (file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if (file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'profile-' + new Date().toISOString() + '.' + filetype);
  },
});

var uploadPhoto = multer({ storage: storagePhotos });

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

app.post('/UploadPhoto', uploadPhoto.single('photo'), (req, res) => {
  var _uid = req.body.uid;
  var file = req.file;
  console.log(_uid);
  console.log(file);
  res.json({ asd: 'success' });
  // if (file) {
  //   sharp(file.path)
  //     .resize(300, 300)
  //     .toFile('./uploads/' + '300x300-' + file.filename, function (err) {
  //       if (err) {
  //         console.log('sharp>>>', err);
  //       } else {
  //         console.log('resize ok !');
  //       }
  //     });
  // } else throw 'error';
});

app.listen(80, () => {
  console.log('Express server listening on port 80');
});
