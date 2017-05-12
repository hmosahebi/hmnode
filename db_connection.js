// connect to db
var mongoose = require('mongoose');
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    var url = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME+'/reports';
}else{
    var url = 'localhost/reports';
}

mongoose.connect('mongodb://'+url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected to DB!");
});
var reportSchema = new mongoose.Schema({
        name : String,
        message: String
    },
    {
        versionKey: false
    })

var dbREPORTS = mongoose.model('reports', reportSchema);
//db.close(); //?!
exports.db = mongoose;
exports.dbReports= dbREPORTS;