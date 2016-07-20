var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();
var db = pgp({
  database: 'candidates',
  user: 'postgres',
  password: 'postgres'
});

/* GET tweets */
router.get('/:graph/:interval', function(req, res, next) {
  
  var column = '';
  switch (req.params.graph) {
    case 'sentiment': column = 'PERCENT_POSITIVE'; break;
    case 'popularity': column = 'NUMBER_OF_TWEETS'; break;
    default:
      res.status(400);
      res.send(`Incorrect value ${req.params.graph} for "graph"`);
      return;
  }

  if (!(req.params.interval === 'day' || req.params.interval === 'hour' || req.params.interval === 'month')) {
    res.status(400);
    res.send(`Incorrect value ${req.params.interval} for "interval"`);
    return;
  }

  db.any("SELECT $1^, PERCENT_POSITIVE, TIME FROM tweets WHERE TIME >= NOW() - '1 $2^'::INTERVAL", [column, req.params.interval])
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  });
});

module.exports = router;