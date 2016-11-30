/**
 * Created by zmk on 2016/9/30.
 */
var express = require('express');
var router = express.Router();
var Post = require('../models/post');

/**
 *  delete posts.
 *  */

router.get('/post/delete/:_id', function(req, res, next){
    console.log("posts delete start Enter");
    if(req.params._id == null){
        req.session.message = "删除的 微博不存在";
        //重定向个人信息页
        res.redirect("/users/" + encodeURIComponent(req.session.user.name));
    } else {
        Post.remove({_id : req.params._id}, function(err, docs){

            if(err){
                req.session.message = err.message;
            } else {
                req.session.success = "成功删除" + docs.result.n + "条数据！";
            }
            //删除成功，重定向个人信息页
            res.redirect("/users/" + encodeURIComponent(req.session.user.name));
        });
    }
});
/**
* 發表微博
* */
router.post('/post', function(req, res){
    var currentUser = req.session.user;
    var post = new Post();
    //将文件写入到图片资源库
    if(req.body.uploadimage && req.body.uploadimage != null && req.body.uploadimage != ""){
        var imgpath = 'http://localhost:3000/photos/test.jpg';//暂时

        imgpath = 'http://localhost:3000/photos/' + req.body.uploadimage;
        post = new Post({
            username : currentUser.name,
            article : req.body.article,
            imgpath : imgpath,
            time : getTime(new Date())
        });
    }
    else {
        post = new Post({
            username : currentUser.name,
            article : req.body.article,
            time : getTime(new Date())
        });
    }
    //先加入redis,再
    post.addPost(post, function(err){
        if(err){
            req.session.message = err.message;
            return res.redirect('/users/' + req.params.username);
        }
        req.session.success = "发表成功";
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.redirect("/users/" + encodeURIComponent(currentUser.name));
    });

});


function getTime(date){
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}
module.exports = router;
