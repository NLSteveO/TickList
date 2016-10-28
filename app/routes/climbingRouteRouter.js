// app/routes/climbingRouteRouter.js

var express = require('express');
var router = express.Router();
var ClimbingRoute = require('../models/climbingRoute');
var Crag = require('../models/crag');
var Gym = require('../models/gym');

router.route('/')

  // Get all climbingRoutes (accessed at GET http://localhost:4000/route)
  .get(function(req, res) {
    ClimbingRoute.find(function(err, routes) {
      if (err) {
        res.send(err);
        return err;
      }
      res.json(routes);
    });
  })

  // Create climbingRoute (accessed at POST http://localhost:4000/route)
  .post(function(req, res) {
    var climbingRoute = new ClimbingRoute();

    if (req.body.isGym === "TRUE") {
      Gym.findById(req.body.gym, function(err, gym) {
        if (err) {
          res.send(err);
          return err;
        }

        climbingRoute.name = req.body.name;
        climbingRoute.grade = req.body.grade;
        climbingRoute.location.isGym = req.body.isGym;
        climbingRoute.location.gym = gym;

        climbingRoute.save(function(err) {
          if (err) {
            res.send(err);
            return err;
          }
          res.json({ message: 'Climbing Route ' + climbingRoute.name + ' created in ' + climbingRoute.location.gym.name + '!'});
        });
      });
    } else {
      Crag.findById(req.body.crag, function(err, crag) {
        if (err) {
          res.send(err);
          return err;
        }

        climbingRoute.name = req.body.name;
        climbingRoute.grade = req.body.grade;
        climbingRoute.location.isGym = req.body.isGym;
        climbingRoute.location.crag = crag;

        climbingRoute.save(function(err) {
          if (err) {
            res.send(err);
            return err;
          }
          res.json({ message: 'Climbing Route ' + climbingRoute.name + ' created in ' + climbingRoute.location.crag.name + '!'});
        });
      });
    }
  });

router.route('/:route_id')

  // Get climbingRoute with this id (accessed at GET http://localhost:4000/route/:route_id)
  .get(function(req, res) {
    ClimbingRoute.findById(req.params.route_id, function(err, route) {
      if (err) {
        res.send(err);
        return err;
      }

      res.json(route);
    });
  })

  // Update climbingRoute with this id (accessed at PUT http://localhost:4000/route/:route_id)
  .put(function(req, res) {
    ClimbingRoute.findById(req.params.route_id, function(err, route) {
      if (err) {
        res.send(err);
        return err;
      }
      var oldName = route.name;
      route.name = req.body.name;
      route.save(function(err) {
        if (err) {
          res.send(err);
          return err;
        }

        res.json({ message: oldName + ' renamed to ' + route.name });
      });
    });
  })

  // Delete climbingRoute with this id (accessed at DELETE http://localhost:4000/route/:route_id)
  .delete(function(req, res) {
    ClimbingRoute.remove({
      _id: req.params.route_id
    }, function(err, route) {
      if (err) {
        res.send(err);
        return err;
      }
      res.json({ message: 'Route successfully deleted!'});
    });
  });

module.exports = router;
