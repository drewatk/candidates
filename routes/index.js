var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Candidates - Polling the 2016 Presidential Race with Twitter' });
});

module.exports = router;
