/**
 * Created by zmk on 2016/9/13.
 */
var mymongoose = require('mongoose');
mymongoose.Promise = global.Promise;
mymongoose.connect('mongodb://localhost/WeiBoUser');

var UserSchema = new mymongoose.Schema({
    name : String,
    password : String,
    CalledName : String,
});

//添加
//这里面的这个methods是固定的 代表添加实例方法
UserSchema.methods.addUser = function(User, callback){
    this.name = User.name;
    this.password = User.password;
    this.save(callback);
}


//这里面的movies是数据库的一个集合
var User = mymongoose.model('User', UserSchema);

function findmongo(){
    User.find('aaa', function(err, user){
        console.log(user);
    });
}

function findTopN(){
    var query = User.find({});

    query.where('password', "eee");
    query.limit(1);
    // query.skip(100);

    query.exec(function(err, docs){
        console.log("start");
        docs.forEach(function(element, index, array){
            // console.log("enter");
            console.log("第" + index + "个结果的名称是：" + element.name);
        });
    });
}

function addmongo(){
    //自定义实例方法
    var myuser = new User();
    myuser.addUser({
        name : "aaa1",
        password : "bbb"
    }, function(err, haha, bbb){
        console.log(":::::::::::" + err);
    });
}

function removemongo(){
    console.log("start:");
    User.remove({name : "vvv"}, function(err, docs){//删除id为4的记录
        if(err){
            console.log("Error:" + err);
        }
        console.log(docs.result.n);
        console.log('remove success');
    });
}

function test(){
    // findmongo();
    findTopN();
}
test();
