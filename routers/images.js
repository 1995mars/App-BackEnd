var express = require('express');
var router = express.Router();
const multer = require('multer');
var Image = require('../models/image');

const Storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, './public/images')
    },
    filename(req, file, callback) {
      callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    },
  })
  
const upload = multer({ storage: Storage });

router.get('/upload',function(req,res){
  res.render('index');
})

router.post('/upload', upload.array('photo', 3), (req, res) => {
    console.log(req.files)
    console.log('body', req.body)
    var image = new Image({
      path: req.files.filename
    });
    console.log(image);
    console.log(req.files[0].filename);
    image.save(function (err) {
      if (err) {
          console.log(err);
      } else {
        console.log('đã lưu');
      }
  });
    res.status(200).json({
      message: 'success!',
    })

  })

module.exports = router;