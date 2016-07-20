var data = {
  // A labels array that can contain any sort of values
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  // Our series array that contains series objects or in this case series data arrays
  series: [
    [5, 2, 4, 2, 0]
  ]
};

var tweetsChart = new Chartist.Line('#tweets', data);
var sentimentChart = new Chartist.Line('#sentiment', data);

var updateGraphs = function() {
  $.get('/tweets/sentiment/hour', function(data) {
    console.log(data);
    sentimentChart.update(data);
  });
};

$(document).ready(function() {


    updateGraphs();
});