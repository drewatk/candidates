var config = require('../config');
var pgp = require('pg-promise')();
var db = pgp(config.pgp);
var stateCodes = ['AL', 'AK', 'AZ', 'AR','CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC', 'PR'];

const INTERVAL = 900000; // 15 minutes in ms

var catchError = function(error) {
  console.error(error);
  if (error)
    throw error;
};

var calcMap = function() {
  stateCodes.forEach((state, index) => {
    db.any("SELECT CANDIDATE FROM locations WHERE STATE = $1 AND POSITIVE = TRUE", state)
    .then(data => {
      var numTrumpPositive = 0;
      for (var i = 0; i < data.length; i++) {
        if (data.candidate === 'trump') {
          numTrumpPositive++;
        }
      }
      var percentTrumpPositive = data.length !== 0 ? 50 * (numTrumpPositive / data.length) : 50;

      db.none("INSERT INTO states VALUES ($1, $2)", [state, percentTrumpPositive])
      .catch(catchError);
    })
    .catch(catchError);
  }
};

setTimeout(calcMap, INTERVAL);