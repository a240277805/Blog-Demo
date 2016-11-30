var mymongoose = require('mongoose');

var UserSchema = new mymongoose.Schema({
    name : String,
    password : String,
    CalledName:String,
});

//添加
//这里面的这个methods是固定的 代表添加实例方法
UserSchema.methods.addUser = function(User, callback){
    this.name = User.name;
    this.password = User.password;
    this.save(callback);
}
UserSchema.methods.validPassword=function(pas){
   return this.password===pas;
}


//这里面的movies是数据库的一个集合
var myUser = mymongoose.model('User', UserSchema);

module.exports = myUser;
