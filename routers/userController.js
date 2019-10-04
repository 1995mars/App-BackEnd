var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Content = require('../models/content');
var bcrypt = require('bcryptjs');

router.post('/create',function(req,res){
    console.log(req.body);
    var userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    var user = new User(userData);
    user.save().then((user) => {
        if(user){
            return user.generateAuthToken();
        }else{
            res.sendStatus(440);
        }
    }).then((token) =>{
        res.header({"x-hash":token}).send(user);
    }).catch((error) => {
        console.log(error);
    });
    
});

router.get('/detail/:id',function(req,res){
    console.log('vào content');
    var id = req.params.id;
    Content.findOne({username: id}, function(err,data){
        if(err){
            console.log('lỗi');
        }else{
            console.log(data);
            res.send(data);
        }
    });
})

router.post('/update/:id',function(req,res){
    console.log('vào content');
    var id = req.params.id;
    var password = req.body.password;
    
    console.log(req.body);
    console.log(id);
    User.findOne({email:id},function(err,data){
        
            data.password = password;
            data.name = req.body.name;
            data.save(function(err){
                if(err){
                    console.log('lỗi');
                }else{
                    console.log('ok');
                    res.send('ok');
                }
		});
        
    });
})
router.get('/login',function(req,res){
    res.send('ok');
});
router.post('/login',function(req,res){
    console.log(req.body.password);
    console.log(req.body.email);
    User.findUserByCredentails(req.body.email,req.body.password).then((user)=>{
            res.header({"x-hash":user.token}).send(user);
    });
});

router.get('/logout',function(req,res){
    console.log(req.body);
    res.send('logout');
});

module.exports = router;