var mongoose = require('mongoose');

//page schema
var ImageSchema = mongoose.Schema({
	path:{
		type: String,
		require: true
	},
	
});

var Image = module.exports = mongoose.model('image', ImageSchema);