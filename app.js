var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var routes = require('./routes/index');
var users = require('./routes/users');
var posts=require('./routes/posts');
var db = require('./models/db');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./Settings.js');
var flash = require('connect-flash');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 app.use(partials());
app.use(favicon(path.join(__dirname, 'public', 'icon.png')));
// app.use(logger('dev'));
app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended : false}));
// app.use(cookieParser());//是Cookie解析的中间件。express.session()提供会话支持 。
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret : settings.cookieSecret,
    store : new MongoStore({
        mongooseConnection : db.dbCon
    }),
    rolling : true,
}));

// error handlers
app.use(function(req, res, next){
    res.setHeader('content-type', 'text/html;charset=UTF-8');
    res.locals.message = res.locals.message ? res.locals.message : undefined;
    res.locals.username = res.locals.username ? res.locals.username : undefined;
    res.locals.success = res.locals.success ? res.locals.success : undefined;

    var err = req.session.error;
    var success = req.session.success;
    var user = req.session.user;
    var mess = req.session.message;
    delete req.session.success;
    delete  req.session.error;
    delete  req.session.message;
    if(err){
        res.locals.message = "*" + err;
    }
    if(mess){
        res.locals.message = "*" + mess;
    }
    if(success){
        res.locals.success = success;
    }
    if(user){
        res.locals.username = user.name;
    }
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/posts', posts);
app.use(flash());
app.use(function(req, res, next){
    res.locals.flash = req.flash;
    next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if(app.get('env') === 'development'){
    app.use(function(err, req, res, next){
        res.status(err.status || 500);
        res.render('error', {
            message : err.message,
            error : err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.render('error', {
        message : err.message,
        error : {}
    });
});
module.exports = app;
