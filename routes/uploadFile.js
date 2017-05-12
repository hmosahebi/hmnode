var express = require('express');
var router = express.Router();
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res){
    res.render('uploadFile',{title: "Upload File",notifications:""});
});

router.post('/', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var old_path = files.file.path;
        var file_size = files.file.size;
        var file_ext = files.file.name.split('.').pop();
        var index = old_path.lastIndexOf('/') + 1;
        var file_name = files.file.name;
        var new_path = path.join(process.cwd(), '/public/uploaded/', file_name);

        fs.readFile(old_path, function(err, data) {
            fs.writeFile(new_path, data, function(err) {
                fs.unlink(old_path, function(err) {
                    if(data != ''){
                        if (err) {
                            res.status(500);
                            res.render('uploadFile',{title: "Upload File",notifications:"Error!"});
                        } else {
                            res.status(200);
                            res.render('uploadFile',{title: "Upload File",notifications:"Uploaded!"});
                        }
                    }else{
                        res.render('uploadFile',{title: "Upload File",notifications:"No File Selected!"});
                    }

                });
            });
        });

    });
})

module.exports = router;