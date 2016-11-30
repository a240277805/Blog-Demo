/**
 * Created by zmk on 2016/11/3.
 */

var express = require('express');
var router = express.Router();
var fs = require('fs');
var multiparty = require('multiparty');

router.get('/photos/:imgname', function(req, res){
    show(req, res);
});


router.post('/upload', function(req, res){
    console.log("upload image-----");
    var form = new multiparty.Form({uploadDir : './public/uploadfile'});
    form.on('error', function(err){
        console.log('Error parsing form: ' + err.stack);
    });
    form.parse(req, function(err, fields, files){
        var filesTmp = JSON.stringify(files, null, 2);
        if(err){
            console.log('parse error: ' + err);
            res.send("写文件操作失败。");

        }
        else {

            console.log('parse files: ' + filesTmp);

            var fileNameArr = Object.keys(files);
            var firstFilename = fileNameArr[0];
            var fileDataArr = files[firstFilename];
            if(!fileDataArr){
                res.send("写文件失败！");
                return;
            }

            console.log(typeof fileDataArr);
            console.log(fileDataArr);
            var fileData = fileDataArr[0];

            var uploadedPath = fileData.path;
            var dstPath = './public/uploadfile/' + fileData.originalFilename;
            fs.rename(uploadedPath, dstPath, function(err){
                if(err){
                    console.log("重命名文件错误：" + err);
                }
                else {
                    console.log("重命名文件成功。");
                }
            });

            //存filepath数据到数据库
            // res.send("文件上传成功");

            // var imgpath='http://localhost:3001/photos/'+fileData.originalFilename;
            // res.render('result', {
            //     innertext : uploadedPath,
            //     imgpath : imgpath,
            // })

            var _callback = req.query.callback;
            var _data = { url: "http://localhost:3000/photos/test.jpg" };
            if (_callback){
                res.type('text/javascript');
                res.send(_callback + '(' + JSON.stringify(_data) + ')');
            }
            else{
                res.json(_data);
            }
        }
    });
});

function show(request, response){
    var imgdir='public/uploadfile/';
    var imgpath=imgdir+request.params.imgname;
    // console.log('show imgpath:'+imgpath);
    fs.readFile(imgpath, 'binary', function(error, file){
        if(error){
            response.writeHead(500, {'Content-Type' : 'text/plain'});
            response.write(error + '\n');
            response.end();
        } else {
            response.writeHead(200, {'Content-Type' : 'image/png'});
            response.write(file, 'binary');
            response.end();
        }
    });
}
module.exports = router;
