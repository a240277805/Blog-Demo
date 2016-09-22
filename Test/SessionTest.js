/**
 * Created by zmk on 2016/9/14.
 */
var express = require('express');
var mycookieParser=require('cookie-parser');
var mysession=require('express-session');
var app = express();

app.use(mycookieParser());
// app.use(mysession({secret: '1234567890QWERTY'}));

app.set('trust proxy', 1) // trust first proxy
app.use(mysession({
    secret: 'keyboard cat',

}))

app.get('/',function(req,res){
    console.log("/  click");
    res.send("hahahah");
});
app.get('/awesome', function(req, res) {
    if(req.session.lastPage) {
        res.write('Last page was: ' + req.session.lastPage + '. ');
    }

    req.session.lastPage = '/awesome';
    res.send('Your Awesome.');
});

app.get('/radical', function(req, res) {
    if(req.session.lastPage) {
        res.write('Last page was: ' + req.session.lastPage + '. ');
        res.end();
        return;
    }

    req.session.lastPage = '/radical';
    res.send('What a radical visit!');
x``});

app.get('/tubular', function(req, res) {
    if(req.session.lastPage) {
        res.write('Last page was: ' + req.session.lastPage + '. ');
        res.end();
        return;
    }

    req.session.lastPage = '/tubular';
    res.send('Are you a surfer?');
});

app.listen(3002);
console.log("Server start");
