var tweetsChart = new Chartist.Line('#tweets', {});
var sentimentChart = new Chartist.Line('#sentiment', {});

var updateGraphs = function() {
  $.get('/tweets/sentiment/hour', function(data) {
    console.log(data);
    sentimentChart.update(data);
  });
};

$(document).ready(function() {
    updateGraphs();
    // TODO: When buttons are clicked, update with new param
});