// app/routes/gymRouter.js

var express = require('express');
var router = express.Router();
var Gym = require('../models/gym');
var Community = require('../models/community');

router.route('/')

  // Get all gyms (accessed at GET http://localhost:4000/gym)
  .get(function(req, res) {
    Gym.find(function(err, gyms) {
      if (err) {
        res.send(err);
        return err;
      }
      res.json(gyms);
    });
  })

  // Create gym (accessed at POST http://localhost:4000/gym)
  .post(function(req, res) {
    var gym = new Gym();

    Community.findById(req.body.community, function(err, community) {
      if (err) {
        res.send(err);
        return err;
      }

      gym.name = req.body.name;
      gym.community = community;

      gym.save(function(err) {
        if (err) {
          res.send(err);
          return err;
        }
        res.json({ message: 'Gym ' + gym.name + ' created in ' + gym.community.name + '!'});
      });
    });
  });

router.route('/:gym_id')

  // Get gym with this id (accessed at GET http://localhost:4000/gym/:gym_id)
  .get(function(req, res) {
    Gym.findById(req.params.gym_id, function(err, gym) {
      if (err) {
        res.send(err);
        return err;
      }

      res.json(gym);
    });
  })

  // Update gym with this id (accessed at PUT http://localhost:4000/gym/:gym_id)
  .put(function(req, res) {
    Gym.findById(req.params.gym_id, function(err, gym) {
      if (err) {
        res.send(err);
        return err;
      }
      var oldName = gym.name;
      gym.name = req.body.name;
      gym.save(function(err) {
        if (err) {
          res.send(err);
          return err;
        }

        res.json({ message: oldName + ' renamed to ' + gym.name });
      });
    });
  })

  // Delete gym with this id (accessed at DELETE http://localhost:4000/gym/:gym_id)
  .delete(function(req, res) {
    Gym.remove({
      _id: req.params.gym_id
    }, function(err, gym) {
      if (err) {
        res.send(err);
        return err;
      }
      res.json({ message: 'Gym successfully deleted!'});
    });
  });

module.exports = router;
