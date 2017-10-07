var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/main', function(req, res, next) {
    res.render('main');
});

router.get('/list', function(req, res, next) {
    res.render('list');
});

router.get('/view', function(req, res, next) {
    res.render('view');
});

router.get('/upload', function(req, res, next) {
    res.render('upload');
});

router.get('/attention', function(req, res, next) {
    res.render('attention');
});

router.get('/msg', function(req, res, next) {
    res.render('msg');
});

module.exports = router;
