var tweetsChart = new Chartist.Line('#tweets', {});
var sentimentChart = new Chartist.Line('#sentiment', {});

var updateGraphs = function(interval = 'hour') {
  $.get('/tweets/' + interval, function(data) {
    var trumpTweets = _.filter(data, function(t) {
      return (t.candidate === 'trump');
    });
    var clintonTweets = _.filter(data, function(t) {
      return (t.candidate === 'clinton');
    });

    sentimentChart.update({
      series: [
        { 
          name: 'trump',
          data: _.map(trumpTweets, function(t) {
            if(t.candidate === 'trump') 
              return {
                y: t.percent_positive,
                x: moment(t.time).format('x')
              };
          })
        },{
          name: 'clinton',
          data: _.map(clintonTweets, function(t) {
            if(t.candidate === 'clinton') 
              return {
                y: t.percent_positive,
                x: moment(t.time).format('x')
              };
          })
        }  
      ],
    }, {
      showPoint: false,
      showLine: true,
      fullWidth: true,
      axisX: {
        type: Chartist.FixedScaleAxis,
        divisor: 5,
        labelInterpolationFnc: function(value) {
          return moment(Math.round(value)).format('MMM, D h:mma');
        }
      },
      axisY: {
        type: Chartist.AutoScaleAxis,
        high: 100,
        low: 0,
        onlyInteger: true
      },
      lineSmooth: Chartist.Interpolation.monotoneCubic({
        fillHoles: false
      }),
    });

    tweetsChart.update({
      series: [
        { 
          name: 'trump',
          data: _.map(trumpTweets, function(t) {
            if(t.candidate === 'trump') 
              return {
                y: t.tweets_per_hour,
                x: moment(t.time).format('x')
              };
          })
        },{
          name: 'clinton',
          data: _.map(clintonTweets, function(t) {
            if(t.candidate === 'clinton') 
              return {
                y: t.tweets_per_hour,
                x: moment(t.time).format('x')
              };
          })
        }  
      ],
    }, {
      showPoint: false,
      showLine: true,
      fullWidth: true,
      axisX: {
        type: Chartist.FixedScaleAxis,
        divisor: 5,
        labelInterpolationFnc: function(value) {
          return moment(Math.round(value)).format('MMM, D h:mma');
        }
      },
      axisY: {
        low: 0,
        onlyInteger: true
      },
      lineSmooth: Chartist.Interpolation.monotoneCubic({
        fillHoles: false
      }),
    });
  });
};

// returns the correct color for the state on a 0 (blue) to 100 (red) scale
var getColor = function(d) {
  return d > 87.5 ? '#b2182b' :
          d > 75  ? '#d6604d' :
          d > 62.5  ? '#f4a582' :
          d > 50  ? '#fddbc7' :
          d > 37.5   ? '#d1e5f0' :
          d > 25   ? '#92c5de' :
          d > 12.5   ? '#4393c3' :
                    '#2166ac';
};



var main = function() {
  updateGraphs();

  $('.btn').click(function(event) {
    updateGraphs($(this).data('interval'));
  });

  // set up the Leaflet map
  var statesMap = L.map('states-map').setView([37.8, -96], 4);
  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZHJld2F0ayIsImEiOiJjaXIycjIxNzQwMDFzZ2dsdzc4OWl6bWh4In0.x2-cmQv6B4rfMjdvGH0vMg', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
  }).addTo(statesMap);
  // Load state areas data and locations
  var d1 = $.get('/js/stateAreas.json'); // these are jQuery deffered objects
  var d2 = $.get('/tweets/hour');
  $.when(d1, d2).done(function(stateAreas, locations) {
    L.geoJson(stateAreas, { style: function(feature) {
      return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      }
    }}).addTo(statesMap);
  });

};

$(document).ready(main);