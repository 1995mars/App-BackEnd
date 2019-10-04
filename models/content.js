var mongoose = require('mongoose');

//page schema
var ContentSchema = mongoose.Schema({
	username:{
		type: String,
		require: true
	},
	age:{
		type: Number,
		require: true
    },
    company:{
		type: Number,
		require: true
    },
    part:{
		type: Number,
		require: true
	}
});

var Content = module.exports = mongoose.model('Content', ContentSchema);