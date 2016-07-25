var _ = require('lodash');
var states = require('./states.json');

// convert degrees to radians by extending number prototype
toRadians = function(deg) {
  var rad = (deg * Math.PI) / 180;
  return rad;
};

// Haversine Implementation from http://www.movable-type.co.uk/scripts/latlong.html
// takes two coordinate arrays, returns distance in km
var distance = function(p1, p2) {
  var R = 6371e3; // metres
  var φ1 = toRadians(p1[0]);
  var φ2 = toRadians(p2[0]);
  var Δφ = toRadians(p2[0] -p1[0]);
  var Δλ = toRadians(p2[1] -p1[1]);

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;

  return d;
};

/* 
  takes coordinates in format [lat, long] and returns 2 digit state code of nearest state (best guess of state it is in)
  Warning: this is not exact, it calculates the closest average lat/long of a state, for example: NYC fails and returns NJ
*/
var getState = function(coordinates) {
  if (!Array.isArray(coordinates) || coordinates.length !== 2) {
    throw new Error('Incorrect format for coordinates pair');
  }
  
  var distances = {};
  _.forEach(states, function(item) {
      distances[item.state] = distance(coordinates, [item.latitude, item.longitude]);
  });

  // Find minimum distance
  var min = Infinity;
  var minState = '';
  for (var state in distances) {
    if (distances[state] < min) {
      min = distances[state];
      minState = state;
    }
  }

  return minState; // return state with lowest distance

};

module.exports = getState;