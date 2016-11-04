// app/routes/communityRouter.js

var express = require('express');
var router = express.Router();
var Community = require('../models/community');
var Province = require('../models/province');

router.route('/')

  // Get all communities (accessed at GET http://localhost:4000/community)
  .get(function(req, res) {
    Community.find(function(err, communities) {
      if (err) {
        res.send(err);
        return err;
      }
      res.render('community', { title: 'Community List', communities: communities });
    });
  })

  // Create community (accessed at POST http://localhost:4000/community)
  .post(function(req, res) {
    var community = new Community();

    Province.findById(req.body.province, function(err, province) {
      if (err) {
        res.send(err);
        return err;
      }

      community.name = req.body.name;
      community.province = province;

      community.save(function(err) {
        if (err) {
          res.send(err);
          return err;
        }
        res.json({ message: 'Community ' + community.name + ' created in ' + community.province.name + '!'});
      });
    });
  });

router.route('/:community_id')

  // Get community with this id (accessed at GET http://localhost:4000/community/:community_id)
  .get(function(req, res) {
    Community.findById(req.params.community_id, function(err, community) {
      if (err) {
        res.send(err);
        return err;
      }

      res.json(community);
    });
  })

  // Update community with this id (accessed at PUT http://localhost:4000/community/:community_id)
  .put(function(req, res) {
    Community.findById(req.params.community_id, function(err, community) {
      if (err) {
        res.send(err);
        return err;
      }
      var oldName = community.name;
      community.name = req.body.name;
      community.save(function(err) {
        if (err) {
          res.send(err);
          return err;
        }

        res.json({ message: oldName + ' renamed to ' + community.name });
      });
    });
  })

  // Delete community with this id (accessed at DELETE http://localhost:4000/community/:community_id)
  .delete(function(req, res) {
    Community.remove({
      _id: req.params.community_id
    }, function(err, community) {
      if (err) {
        res.send(err);
        return err;
      }
      res.json({ message: 'Community successfully deleted!'});
    });
  });

module.exports = router;
