/**
 * Created by zmk on 2016/9/16.
 */
var mymongoose = require('mongoose');

var PostSchema = new mymongoose.Schema({
    username : String,
    article : String,
    imgpath:String,
    time : String,
});

//添加
//这里面的这个methods是固定的 代表添加实例方法
PostSchema.methods.addPost = function(Post, callback){
    this.time = Post.time,
        this.username = Post.username,
        this.article = Post.article,
    this.save(callback);
}


//这里面的movies是数据库的一个集合
var myPost = mymongoose.model('Post', PostSchema);

module.exports = myPost;
module.exports.remove=myPost.remove;
