var http = require('http');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var env = process.env;
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(socket){
    console.log('Socket Connection Detected!');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('generateMessage', function (data) {
        io.emit('publishMessage', [data]);
    })
});

// Make io accessible to our router
app.use(function(req,res,next){
    req.io = io;
    next();
});
var routes = require('./routes/index');
var reports = require('./routes/reports');
var addReport = require('./routes/addReport');
var uploadFile = require('./routes/uploadFile');
var uploads = require('./routes/uploads');
var qrCode = require('./routes/qrCode');
var socketIO = require('./routes/socketIO');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var appViewLabels = ['/', '/home', '/reports', '/addReport', '/uploadFile','/uploads','/qrCode','/socketIO'];
var appViews = [routes, routes, reports, addReport, uploadFile, uploads, qrCode, socketIO];
appViewLabels.forEach(function(value, index){
    //console.log(appViews[index])
    app.use(value, appViews[index]);
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

server.listen(env.NODE_PORT || 3000, env.NODE_IP || '127.0.0.1', function () {
  console.log(`Application worker ${process.pid} started...`);
});
module.exports = app;