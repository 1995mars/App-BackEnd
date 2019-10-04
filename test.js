var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config/database');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
let encode = require('image-encode')

var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
 // read binary data
 var bitmap = fs.readFileSync(file);
 // convert binary data to base64 encoded string
 return new Buffer(bitmap).toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
  // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
 var bitmap = new Buffer(base64str, 'base64');
 // write buffer to file
 fs.writeFileSync(file, bitmap);
 console.log('******** File created from base64 encoded string ********');
}

// convert image to base64 encoded string
var base64str = base64_encode('./public/test.docx');
console.log(base64str);
// convert base64 string back to image
base64_decode(base64str, 'copy.docx');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set public folder
app.use(express.static(path.join(__dirname, '/public')));

// Body Parser middleware
// 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var port = 3000;
fs.writeFileSync(
  './public/images.jpg',
  Buffer.from(encode([0,0,0,255, 255,255,255,255, 255,255,255,255, 0,0,0,255], [2, 2], 'jpg'))
)

app.listen(port, function () {
    console.log('server started on port: ' + port)
});