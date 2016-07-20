var data = {
  // A labels array that can contain any sort of values
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  // Our series array that contains series objects or in this case series data arrays
  series: [
    [5, 2, 4, 2, 0]
  ]
};

new Chartist.Line('#tweets', data);
new Chartist.Line('#sentiment', data);

$(document).ready(function() {
    console.log('JQUERY YEAHHHHHH')
})