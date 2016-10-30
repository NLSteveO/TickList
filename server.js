// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');	// call express
var app = express();			// define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://ticklistAdmin:ticklist@ds053126.mlab.com:53126/ticklist');

// call the routes we want
var Country = require('./app/routes/countryRouter');
var Province = require('./app/routes/provinceRouter');
var Community = require('./app/routes/communityRouter');
var Crag = require('./app/routes/cragRouter');
var Gym = require('./app/routes/gymRouter');
var ClimbingRoute = require('./app/routes/climbingRouteRouter');
var ClimbingProblem = require('./app/routes/climbingProblemRouter');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', './app/views');
app.set('view engine', 'pug');

var port = process.env.PORT || 4000;	// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();        // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:4000/api)
router.get('/', function(req, res) {
  res.render('index', { title: 'Welcome', message: 'hooray! welcome to our api!' });
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);
app.use('/country', Country);
app.use('/province', Province);
app.use('/community', Community);
app.use('/crag', Crag);
app.use('/gym', Gym);
app.use('/route', ClimbingRoute);
app.use('/problem', ClimbingProblem);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
