var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();
var db = pgp({
  database: 'candidates',
  user: 'postgres',
  password: 'postgres'
});

/* GET tweets */
router.get('/', function(req, res, next) {
  db.any('SELECT * FROM tweets')
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    res.sendStatus(501);
    throw error;
  });
});

module.exports = router;