// app/routes/climbingProblemRouter.js

var express = require('express');
var router = express.Router();
var ClimbingProblem = require('../models/climbingProblem');
var Crag = require('../models/crag');
var Gym = require('../models/gym');

router.route('/')

  // Get all climbingProblems (accessed at GET http://localhost:4000/problem)
  .get(function(req, res) {
    ClimbingProblem.find(function(err, problems) {
      if (err) {
        res.send(err);
        return err;
      }
      res.json(problems);
    });
  })

  // Create climbingProblem (accessed at POST http://localhost:4000/problem)
  .post(function(req, res) {
    var climbingProblem = new ClimbingProblem();

    if (req.body.isGym === "TRUE") {
      Gym.findById(req.body.gym, function(err, gym) {
        if (err) {
          res.send(err);
          return err;
        }

        climbingProblem.name = req.body.name;
        climbingProblem.grade = req.body.grade;
        climbingProblem.location.isGym = req.body.isGym;
        climbingProblem.location.gym = gym;

        climbingProblem.save(function(err) {
          if (err) {
            res.send(err);
            return err;
          }
          res.json({ message: 'Climbing Problem ' + climbingProblem.name + ' created in ' + climbingProblem.location.gym.name + '!'});
        });
      });
    } else {
      Crag.findById(req.body.crag, function(err, crag) {
        if (err) {
          res.send(err);
          return err;
        }

        climbingProblem.name = req.body.name;
        climbingProblem.grade = req.body.grade;
        climbingProblem.location.isGym = req.body.isGym;
        climbingProblem.location.crag = crag;

        climbingProblem.save(function(err) {
          if (err) {
            res.send(err);
            return err;
          }
          res.json({ message: 'Climbing Problem ' + climbingProblem.name + ' created in ' + climbingProblem.location.crag.name + '!'});
        });
      });
    }
  });

router.route('/:problem_id')

  // Get problem with this id (accessed at GET http://localhost:4000/problem/:problem_id)
  .get(function(req, res) {
    ClimbingProblem.findById(req.params.problem_id, function(err, problem) {
      if (err) {
        res.send(err);
        return err;
      }

      res.json(problem);
    });
  })

  // Update problem with this id (accessed at PUT http://localhost:4000/problem/:problem_id)
  .put(function(req, res) {
    ClimbingProblem.findById(req.params.problem_id, function(err, problem) {
      if (err) {
        res.send(err);
        return err;
      }
      var oldName = problem.name;
      problem.name = req.body.name;
      problem.save(function(err) {
        if (err) {
          res.send(err);
          return err;
        }

        res.json({ message: oldName + ' renamed to ' + problem.name });
      });
    });
  })

  // Delete problem with this id (accessed at DELETE http://localhost:4000/problem/:problem_id)
  .delete(function(req, res) {
    ClimbingProblem.remove({
      _id: req.params.problem_id
    }, function(err, problem) {
      if (err) {
        res.send(err);
        return err;
      }
      res.json({ message: 'Problem successfully deleted!'});
    });
  });

module.exports = router;
