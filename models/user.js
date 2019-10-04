var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');
//page schema
var UserSchema = mongoose.Schema({
	password:{
		type: String,
		require: true,
		trim: true,
		unique: true,
		minlenght: 8
	},
	name: {
		type: String,
		require: true,
		trim: true,
		unique: true,
		minlenght: 4
	},
	email: {
		type: String,
		require: true,
		trim: true,
		unique: true,
		minlenght: 10
	},
	tokens:[
		{
			access:{
				type: String,
				require:true
			},
			token:{
				type:String,
				require:true
			}
		}
	]
});

UserSchema.statics.findUserByCredentails = function(email,password){
	const User = this;
	return User.findOne({email}).then((user)=> {
		console.log('tìm thấy email');
		console.log(password);
		if(!user){
			
			Promise.reject();
		}else{
			return new Promise((resolve,reject)=>{
				console.log('bcrypt');
				bcrypt.compare(password, user.password, (err,res)=>{
					console.log(res);
					if(res){
						console.log('tim thay');
						resolve(user);
					}
					else{
						reject();
					}
				})
			})
		}
	})
}

UserSchema.methods.toJSON = function(){
	const user = this;
	const userObject = user.toObject();
	return _.pick(userObject,["_id","email","name"]);
}

UserSchema.methods.generateAuthToken = function(){
	const user = this;
	const access = "auth";
	const token = jwt.sign({_id:user._id,access}, 'NJHD3423JHDJ').toString();
	user.tokens.push({access,token});
	user.save().then(()=> {
		return token;
	});
}

UserSchema.pre("save", function(next){
	const user = this;
	if(user.isModified("password")){
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(user.password, salt, function(err, hash) {
				user.password = hash;
				next();
			});
		});
	}else{
		next();
	}
});

var User = module.exports = mongoose.model('User', UserSchema);