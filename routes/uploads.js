var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

// show all uploads
router.get('/', function(req, res){
        function fileList(dir) {
            return fs.readdirSync(dir).reduce(function(list, file) {
                var name = path.join(dir, file);
                var file = file;
                var isDir = fs.statSync(name).isDirectory();
                return list.concat([file]);
            }, []);
        }
        res.render('uploads',{title: "All Uploads:", uploads: fileList('public/uploaded')});
});
module.exports = router;