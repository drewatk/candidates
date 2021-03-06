var Twitter = require('twitter');
var async = require('async');
var natural = require('natural');
var config = require('../config');
var getState = require('./getState');

var pgp = require('pg-promise')();
var db = pgp(config.pgp);

// Interval in ms for when to log tweets to database
const INTERVAL = 60000 * 5;

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

// Set up twitter client from config variable
var twitterClient = new Twitter(config.twitter);

async.forEachOf(candidates, function(candidate, key, callback) {

  // Object to keep track of number of tweets and number of positive tweets in the given time period
  var tweetCounter = {
    numTweets: 0,
    numPositive: 0,
    percentPositive() { return 100 * (this.numPositive / this.numTweets); },
    tweetsPerHour(interval = INTERVAL) { 
      return ((3600000 * this.numTweets) / interval);
    },
    reset() {
      this.numTweets = 0;
      this.numPositive = 0;
    },

  };

  var stream = twitterClient.stream('statuses/filter', {
    'track': candidate.keywords,
    'language': 'en',
    // 'filter_level': 'low'
  });
  stream.on('data', function(tweet) { 

    // ignore empty tweets, retweets, and quotes
    if (!tweet.text || tweet.retweeted_status || tweet.quoted_status) 
      return;

    // Classify tweet
    tweet.isPositive = candidate.classifier.classify(tweet.text) === 'positive';
    tweetCounter.numTweets++; // increment

    if (tweet.coordinates && tweet.coordinates.type === "Point" && tweet.coordinates.coordinates) {
      // swap lat and long
      var tmp = tweet.coordinates.coordinates[0];
      tweet.coordinates.coordinates[0] = tweet.coordinates.coordinates[1];
      tweet.coordinates.coordinates[1] = tmp;
      
      // TODO: Make a bounding box and discard tweets outside of US

      db.none(
        "INSERT INTO locations(COORDINATES, POSITIVE, CANDIDATE, STATE, TIME) values($1, $2, $3, $4, CURRENT_TIMESTAMP)", 
        [tweet.coordinates.coordinates, tweet.isPositive, key, getState(tweet.coordinates.coordinates)]
      )
      .catch(function (error) {
        console.error(error);
        if (error)
          throw error;
      });
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
    if (isNaN(tweetCounter.percentPositive() || isNan(tweetCounter.tweetsPerHour()))) {
      throw new Error('Got NaN, this might mean that the twitter stream has lost connection');
    }
    db.none(
      "INSERT INTO tweets(CANDIDATE, TIME, TWEETS_PER_HOUR, NUMBER_OF_TWEETS, PERCENT_POSITIVE) values($1, CURRENT_TIMESTAMP, $2, $3, $4)", 
      [key, tweetCounter.tweetsPerHour(INTERVAL), tweetCounter.numTweets, tweetCounter.percentPositive()]
    )
    .then(function () {
      // console.log('saved to db');
    })
    .catch(function (error) {
      console.error(error);
      if (error) 
        throw error;
    });

    console.log(key + ': ' + tweetCounter.numTweets + ' tweets');
    console.log(key + ': ' + tweetCounter.tweetsPerHour() + ' tph');
    console.log(key + ': ' + tweetCounter.percentPositive() + '% positive');
    tweetCounter.reset();

  }, INTERVAL);

  callback();
});
