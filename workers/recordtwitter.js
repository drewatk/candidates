var Twitter = require('twitter');
var async = require('async');
var natural = require ('natural');

// var pgp = require('pg-promise')(/*options*/);
// var db = pgp('postgres://username:password@host:port/database');

// load classifiers
var trumpClassifier = natural.BayesClassifier.restore(require('../classifiers/trumpClassifier.json'));
var clintonClassifier = natural.BayesClassifier.restore(require('../classifiers/clintonClassifier.json'));

// define candidates
var candidates = {
  'trump': { 
    keywords: 'Trump, Donald Trump, realDonaldTrump',
    classifier: trumpClassifier
  },
  'clinton': {
    keywords: 'Clinton, Hilary, Hilary Clinton, HillaryClinton',
    classifier: clintonClassifier
  }
};

var twitterClient = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

async.forEachOf(candidates, function(candidate, key, callback) {

  // Object to keep track of number of tweets and number of positive tweets in the given time period
  var tweetCounter = {
    numTweets: 0,
    numPositive: 0,
    percentPositive() { return 100 * (this.numPositive / this.numTweets); },
    reset() {
      this.numTweets = 0;
      this.numPositive = 0;
    },

  };

  var stream = twitterClient.stream('statuses/filter', {'track': candidate.keywords});
  stream.on('data', function(tweet) { 

    // ignore empty tweets, retweets, and quotes
    if (!tweet.text || tweet.retweeted_status || tweet.quoted_status) 
      return;

    // Classify tweet
    tweet.isPositive = candidate.classifier.classify(tweet.text) === 'positive';
    tweetCounter.numTweets++; // increment

    if (key == 'trump' && tweet.isPositive) {
      // console.log('POS: ' + tweet.text);
    }
    else if (key == 'trump' && !tweet.isPositive) {
      // console.log('NEG: ' + tweet.text);
    }

    // Increment numPositive if the tweet is positive
    if (tweet.isPositive) {
      tweetCounter.numPositive++;
    }
  });

  stream.on('error', function(error) {
    throw error;
  });

  // Every minute, log the average to the database and reset the average
  setInterval(function() {
    // TODO: Log to the database
    console.log(key + ': ' + tweetCounter.numTweets + ' tweets');
    console.log(key + ': ' + tweetCounter.percentPositive() + '% positive');
    tweetCounter.reset();

  }, 60000);

  callback();
});


