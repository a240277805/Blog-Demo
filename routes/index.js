var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var q =require('q');
var  redisclient=require('../utils/redisclient');
// var myrouter = require("./myrouter");
// var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res){
    if(  res.locals.username!==undefined){

        redisclient.getItem("TOP9",function(err,posts){
            if(err){
              console.log(err);
            }
            if(posts===null){
                Post.find({}).sort({'_id' : -1}).limit(9).exec(function(err, mongoposts){
                    if(err){
                        req.session.message = err.message;
                        return res.redirect('/');
                    }

                    redisclient.setItem("TOP9",mongoposts,redisclient.defaultExpired);

                    res.render('index', {
                        title : '首页',
                        layout : 'layout',
                        posts : mongoposts
                    });
                });
            }
            else
            {
                // console.log("find posts from redis");
                res.render('index', {
                    title : '首页',
                    layout : 'layout',
                    posts : posts
                });
            }

        })

    }
    else {
        posts = new Post();
        res.render('index', {
            title : '首页',
            layout : 'layout',
            maxshowcount : 0,
            posts : posts
        });
    }
});
module.exports = router;
