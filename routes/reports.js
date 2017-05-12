var express = require('express');
var router = express.Router();

var db_connection = require('../db_connection');
// show all reports
router.get('/', function(req, res){
    db_connection.dbReports.find(function(err, reports){
        //res.json(reports);
        res.render('reports',{title: "All Reports", reports : reports});
    })
});

router.post('/', function(req, res){
    //console.log(req.body.id, req.body.method);
    db_connection.dbReports.findByIdAndRemove(req.body.id, function (err, reports) {
        if (!err) {
            console.log('reportd deleted!');
            res.send(reports);
        } else {
            console.log('error');
        }
    })
});
module.exports = router;
