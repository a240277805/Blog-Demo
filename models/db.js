var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/WeiBoUser');
var db=mongoose.connection;
module.exports={
    "dbCon":db,
    "mongoose":mongoose
};
