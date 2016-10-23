// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');	// call express
var app = express();			// define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://ticklistAdmin:ticklist@ds053126.mlab.com:53126/ticklist');

var Climb = require('./app/models/climb');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// on routes that end in /climbs
// ----------------------------------------------------
router.route('/climbs')

  // create a climb (accessed at POST http://localhost:4000/api/climbs)
  .post(function(req, res) {
    var climb = new Climb();      // create a new instance of the Climb model
    climb.name = req.body.name;   // set the climbs name (comes from the request body)

    // save the climb and check for errors
    climb.save(function(err) {
      if (err) {
        res.send(err);
        return err;
      }

      res.json({ message: 'Climb created!' });
    });

  })

  // get all the climbs (accessed at GET http://localhost:4000/api/climbs)
  .get(function(req, res) {
    Climb.find(function(err, climbs) {
      if (err) {
        res.send(err);
        return err;
      }

      res.json(climbs);
    });

  });

// on routes that end in /climbs/:climb_id
// ----------------------------------------------------
router.route('/climbs/:climb_id')

  // get the climb with that id (accessed at GET http://localhost:4000/api/climbs/:climb_id)
  .get(function(req, res) {
    Climb.findById(req.params.climb_id, function(err, climb) {
      if (err) {
        res.sent(err);
        return err;
      }

      res.json(climb);
    });
  })

  // update the climb with this id (accessed at PUT http://localhost:4000/api/climbs/:climb_id)
  .put(function(req, res) {

    // use our climb model to find the climb we want
    Climb.findById(req.params.climb_id, function(err, climb) {
      if (err) {
        res.send(err);
        return err;
      }

      climb.name = req.body.name;   // update the climbs info

      // save the climb
      climb.save(function(err) {
        if (err) {
          res.send(err);
          return err;
        }

        res.json({ message: 'Climb updated!' });
      });
    });
  })

  // delete the climb with this id (accessed at DELETE http://localhost:4000/api/climbs/:climb_id)
  .delete(function(req, res) {

    Climb.remove({
      _id: req.params.climb_id
    }, function(err, climb) {
      if (err) {
        res.send(err);
        return err;
      }

      res.json({ message: 'Successfully deleted!' });
    });
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
