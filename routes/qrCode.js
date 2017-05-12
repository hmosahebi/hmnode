var express = require('express');
var router = express.Router();
var QRCode = require('qrcode-npm');
var htmlparser = require("htmlparser");
router.post('/', function(req, res){
        var _url = req.body.url;
        if(_url != ""){
                var qr = QRCode.qrcode(4, 'M');
                qr.addData(_url);
                qr.make();
                res.render('qrCode',{title: "qrCode:" , notification:'', qrCodeSrc: qr.createImgTag(4)});
        }else{
                res.render('qrCode',{title: "qrCode:" , notification:'NO URL!', qrCodeSrc:''});
        }
})
// show QRCode
router.get('/', function(req, res){
        res.render('qrCode',{title: "qrCode:" , notification:'', qrCodeSrc:''});
});
module.exports = router;