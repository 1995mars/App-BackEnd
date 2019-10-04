var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config/database');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();


mongoose.set('useFindAndModify', false);
//connet to db
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('conneted to mongodb');
});
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
const user = require("./routers/userController");
app.use('/user',user);

const api = require("./routers/images");
app.use('/api',api);


app.get('/',function(req,res){
    res.send('minh');
});

app.listen(port, function () {
    console.log('server started on port: ' + port)
});