# Twitter Candidates 
Polling the 2016 Presidential Race with Twitter and Natural Language Processing: 
[candidates.drewatkinson.me](https://candidates.drewatkinson.me/)

## Questions and Answers

#### Q. How is each graph or map calculated?
**A.**
- The map of states takes all positive tweets that were geocoded, and takes the average share of positive tweets about each candidate to determine a rough "vote share" for every state.
- The popularity graph charts the popularity of each candidate, counted by number of tweets per hour in 5 minute incriments.
- The sentiment grap charts the percentage of tweets about each candidate that are positive, calculated every 5 minutes by a Natural Language Classifier (Naive Bayes).

#### Q. Why did you make this project?
**A.** I wanted to use my knowledge of Node.js and Express, but also learn to incorporate an SQL Database. I also have been getting more interested in Natural Language Processing and Data Science.
The natural intersection of all of these things was a project involving the presidential election. I chose twitter as the source of the data because I think that traditional phone polls are going to, eventually, become less reliable as less people have landline phones.
I think polling of general public opinion online is an important step in the political process that we need to figure out, and work has already started with projects like [BeHeardPhilly](http://www.cla.temple.edu/isr/BeHeardPhilly/).

#### Q. How accurate is this data?
**A.** Probably, not at all. Here's what needs improved:

- The Naive Bayes model that classifies tweets as positive or negative is trained by a very small sample taken from a single day.
- The data should be averaged or fit to a regression to give a better overview of these metrics over larger samples of time.
- A very small fraction of tweets are encoded with geographic coordinates (less than 1%), so there is a very small sample size to work with.
- In addition to the above, the state that the tweet is in is calculated by the shortest distance to the average coordinates of each state. This could be improved easily with a geocoding service or taking the state's entire area in to account.

## Credits

#### Front End
- [Leaflet](http://leafletjs.com/) Javascript maps
- [Chartist](https://gionkunz.github.io/chartist-js/) SVG charts
- [Moment](http://momentjs.com/) Time library
- [Lodash](https://lodash.com/)
- [jQuery](http://jquery.com/)
- [Boostrap](http://getbootstrap.com/)
- [Font Awesome v4](http://fontawesome.io/)
- [Github Corners](http://tholman.com/github-corners/) by Tim Holman

#### Back End
- [Node.js v6.3](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/) and [pg-promise](https://github.com/vitaly-t/pg-promise)
- [Async](https://github.com/caolan/async)
- [Express](http://expressjs.com/) web framework and it's generator
- [Natural](https://github.com/NaturalNode/natural) Natural Language Processing library for Nodejs
- [SASS](http://sass-lang.com/) preprocessor and its [express middleware](https://github.com/sass/node-sass-middleware)
- [Pug](https://github.com/pugjs/pug) templating library
- [Twitter Node library](https://github.com/desmondmorris/node-twitter)

#### Data Sources
- [Twitter Streaming API](https://dev.twitter.com/streaming/overview)
- geoJSON data from [Mike Bostock](http://bost.ocks.org/mike) through [Leaflet](http://leafletjs.com/examples/us-states.js)
- Average latitude and longitude for US states from [Maxmind](http://dev.maxmind.com/geoip/legacy/codes/state_latlon/)
- [OpenStreetMap](https://www.openstreetmap.org/#map=5/51.500/-0.100) map data
- [Mapbox](https://www.mapbox.com/) map imagery

## Special Thanks
[vitaly-t](https://github.com/vitaly-t) (Author of pg-promise) for the pull requests and helping me understand PostgreSQL
