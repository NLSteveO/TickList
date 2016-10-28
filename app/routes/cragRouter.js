// app/routes/cragRouter.js

var express = require('express');
var router = express.Router();
var Crag = require('../models/crag');
var Community = require('../models/community');

router.route('/')

  // Get all crags (accessed at GET http://localhost:4000/crag)
  .get(function(req, res) {
    Crag.find(function(err, crags) {
      if (err) {
        res.send(err);
        return err;
      }
      res.json(crags);
    });
  })

  // Create crag (accessed at POST http://localhost:4000/crag)
  .post(function(req, res) {
    var crag = new Crag();

    Community.findById(req.body.community, function(err, community) {
      if (err) {
        res.send(err);
        return err;
      }

      crag.name = req.body.name;
      crag.community = community;

      crag.save(function(err) {
        if (err) {
          res.send(err);
          return err;
        }
        res.json({ message: 'Crag ' + crag.name + ' created in ' + crag.community.name + '!'});
      });
    });
  });

router.route('/:crag_id')

  // Get crag with this id (accessed at GET http://localhost:4000/crag/:crag_id)
  .get(function(req, res) {
    Crag.findById(req.params.crag_id, function(err, crag) {
      if (err) {
        res.send(err);
        return err;
      }

      res.json(crag);
    });
  })

  // Update crag with this id (accessed at PUT http://localhost:4000/crag/:crag_id)
  .put(function(req, res) {
    Crag.findById(req.params.crag_id, function(err, crag) {
      if (err) {
        res.send(err);
        return err;
      }
      var oldName = crag.name;
      crag.name = req.body.name;
      crag.save(function(err) {
        if (err) {
          res.send(err);
          return err;
        }

        res.json({ message: oldName + ' renamed to ' + crag.name });
      });
    });
  })

  // Delete crag with this id (accessed at DELETE http://localhost:4000/crag/:crag_id)
  .delete(function(req, res) {
    Crag.remove({
      _id: req.params.crag_id
    }, function(err, crag) {
      if (err) {
        res.send(err);
        return err;
      }
      res.json({ message: 'Crag successfully deleted!'});
    });
  });

module.exports = router;
