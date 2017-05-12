var express = require('express');
var router = express.Router();
var date = new Date();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index',
        { title: 'Node Express MongoDB Boilerplate' ,
            updateDate: date,
            infos :["MongoDB - Data Entry",
                    "MongoDB - Show entered Data",
                    "Upload File feature",
                    "Show all Uploaded Files",
                    "Node QRCode Generator",
                    "Using Socket IO in Router"],
            toDos:[]});
});

module.exports = router;
