/**
 * Created by zmk on 2016/9/13.
 */
var User = require("../models/user");

function test(){
    //自定义实例方法
    var myuser = new User();
    myuser.addUser({
        name : "aaa1",
        password : "bbb"
    }, function(err, haha, bbb){
        console.log(":::::::::::" + err);
    });
}
function test1(){
    User.find('aaa', function (err, user) {
        console.log(user);
    });
}
test1();
// User.find({name : "aaa"}, function(err, doc){
//     console.log(doc);
// });
// test();
