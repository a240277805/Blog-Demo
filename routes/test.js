/**
 * Created by zmk on 2016/11/3.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/test', function(req, res){
    res.render('test/test', {
        title : '用户注册',
    });
});


module.exports=router;
