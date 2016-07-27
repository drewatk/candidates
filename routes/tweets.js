var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();
var config = require('../config');
var db = pgp(config.pgp);

// Allow Cross origin
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* GET tweets/states */
router.get('/states', function(req, res, next) {
  db.many("SELECT * FROM STATES")
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  });
});

/* GET tweets */
router.get('/:interval', function(req, res, next) {

  var interval = '';
  switch (req.params.interval) {
    case 'hour': interval = '1 hour'; break;
    case 'day': interval = '1 day'; break;
    case 'week': interval = '7 days'; break;
    case 'month': interval = '1 month'; break;
    default:
      res.status(400);
      res.send(`Incorrect value ${req.params.interval} for "interval"`);
      return;
  }

  db.any("SELECT PERCENT_POSITIVE, TWEETS_PER_HOUR, TIME, CANDIDATE FROM tweets WHERE TIME >= NOW() - $1::INTERVAL", interval)
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  });
});

module.exports = router;
