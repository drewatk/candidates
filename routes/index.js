var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Candidates - Polling the 2016 Presidential Race with Twitter' });
});

/* GET about page */
router.get('/readme', function(req, res, next) {
  res.render('readme');
});

module.exports = router;
