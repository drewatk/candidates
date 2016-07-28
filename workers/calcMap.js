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

var calcMap = function () {
  db.tx(t=> {
    var queries = stateCodes.map(state=> {
      var numTrumpPositive = 0;
      return t.each("SELECT CANDIDATE FROM locations WHERE TIME >= NOW() - '1 month'::INTERVAL AND STATE = $1 AND POSITIVE = TRUE", state, c=> {
        numTrumpPositive += c.candidate === 'trump' ? 1 : 0;
      })
      .then(data=> {
        var percentTrumpPositive = data.length ? 100 * (numTrumpPositive / data.length) : 50;
        console.log(state, percentTrumpPositive);
        return t.none(`UPDATE states SET PERCENT_POSITIVE = $1 WHERE STATE = $2;
                      INSERT INTO states (PERCENT_POSITIVE, STATE)
                      SELECT $1, $2
                      WHERE NOT EXISTS (SELECT 1 FROM states WHERE STATE = $2);`, [percentTrumpPositive, state]);
      });
    });
    return t.batch(queries);
  }).catch(catchError);
};

calcMap();
setInterval(calcMap, INTERVAL);
