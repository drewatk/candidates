var tweetsChart = new Chartist.Line('#tweets', {});
var sentimentChart = new Chartist.Line('#sentiment', {});

var updateGraphs = function(interval = 'hour') {
  $.get('/tweets/' + interval, function(data) {
    console.log(data);

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
        divisor: 6,
        labelInterpolationFnc: function(value) {
          return moment(Math.round(value)).format('ddd, h:mm a');
        }
      }
    });

    tweetsChart.update({
      series: [
        { 
          name: 'trump',
          data: _.map(trumpTweets, function(t) {
            if(t.candidate === 'trump') 
              return {
                y: t.number_of_tweets,
                x: moment(t.time).format('x')
              };
          })
        },{
          name: 'clinton',
          data: _.map(clintonTweets, function(t) {
            if(t.candidate === 'clinton') 
              return {
                y: t.number_of_tweets,
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
        divisor: 6,
        labelInterpolationFnc: function(value) {
          return moment(Math.round(value)).format('ddd, h:mm a');
        }
      }
    });
  });
};

$(document).ready(function() {
    updateGraphs();
    // TODO: When buttons are clicked, update with new param
    $('.btn').click(function(event) {
      updateGraphs($(this).data('interval'));
    })
});