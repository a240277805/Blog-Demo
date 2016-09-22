/**
 * Created by zmk on 2016/9/14.
 */
var express = require('express');
var app = express();

app.get('/', function(req, res){
    // res.send(new Buffer('whoop'));
    //  res.send({ some: 'json' });
    // res.send('<p>some html</p>');
    // res.status(404).send('Sorry, we cannot find that!');
    res.status(500).send({ error: 'something blew up' });

});

app.listen(3001);
