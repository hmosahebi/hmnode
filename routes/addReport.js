var express = require('express');
var router = express.Router();
var db_connection = require('../db_connection');

router.post('/', function(req, res){
    var report = new db_connection.dbReports({
        name: req.body.user,
        message: req.body.reports
    })
    var user = req.body.user;
    var reports = req.body.reports;
    var updateID = req.body.id;
    if(user !== undefined && reports!==undefined && user != "" && reports != ""){
        if(req.body.method == "update"){
            console.log(updateID, user, reports)
            db_connection.dbReports.findByIdAndUpdate(req.body.id,{ name: user, message: reports }, function (err, reports) {
                if (!err) {
                    console.log('reportd updated!');
                } else {
                    console.log('error');
                }
            })
        }else
        {
            report.save(function(error, report, num){
                if(error){
                    res.render('addReport',{title: "Add Report",msgText:"Error Occurred!", msgType:"error"});
                }else{
                    res.render('addReport',{title: "Add Report",msgText:"success", msgType:"success"});
                }
                console.log('INPUT PROTOCOL',error, report, num);
            });
        }
    }else{
        res.render('addReport',{title: "Add Report",msgText:"Invalid Entry!", msgType:"error"});
    }
    //res.redirect('/addReport');
})
// add report
router.get('/', function(req, res){
    res.render('addReport',{title: "Add Report",msgText:"", msgType:""});
});

module.exports = router;