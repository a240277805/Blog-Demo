var express = require('express');
var router = express.Router();
var myrouter=require("./myrouter");
var User=require('../models/user');

/* GET home page. */
router.get('/', myrouter.index);
router.get('/u/:user', myrouter.user);
router.get('/post', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/reg', myrouter.doReg);

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/logout', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/reg',function (req,res) {
 // return res.redirect('/');
  if(req.body['password-repeat']!=req.body['password'])
  {
    return res.redirect('/reg')
  }
  var newUser=new User({
    name:req.body.username,
    password:req.body['password'],
  });
  console.log("注册成功000000000000000000000000000000000000000000000000000000");
  User.get(newUser.name,function (err,user) {

    newUser.save(function (err) {
      if(err)
      {
        console.log("注册成功2222222222222222222222");
        console.log(err);
        return res.redirect('/reg');
      }
      req.session.user=newUser;
      req.flash('success','注册成功');

      res.redirect('/');
    })
  })

});


module.exports = router;
