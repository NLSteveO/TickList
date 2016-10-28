// app/routes/countryRouter.js

var express = require('express');
var router = express.Router();
var Country = require('../models/country');

router.route('/')

  // Get all countries (accessed at GET http://localhost:4000/county)
  .get(function(req, res) {
    Country.find(function(err, countries) {
      if (err) {
        res.send(err);
        return err;
      }
      res.json(countries);
    });
  })

  // Create country (accessed at POST http://localhost:4000/country)
  .post(function(req, res) {
    var country = new Country();
    country.name = req.body.name;

    country.save(function(err) {
      if (err) {
        res.send(err);
        return err;
      }
      res.json({ message: 'Country ' + country.name + ' created!'});
    });
  });

router.route('/:country_id')

  // Get country with this id (accessed at GET http://localhost:4000/country/:country_id)
  .get(function(req, res) {
    Country.findById(req.params.country_id, function(err, country) {
      if (err) {
        res.send(err);
        return err;
      }
      res.json(country)
    })
  })

  // Update country with this id (accessed at PUT http://localhost:4000/country/:country_id)
  .put(function(req, res) {
    Country.findById(req.params.country_id, function(err, country) {
      if (err) {
        res.send(err);
        return err;
      }
      var oldName = country.name;
      country.name = req.body.name;
      country.save(function(err) {
        if (err) {
          res.send(err);
          return err;
        }

        res.json({ message: oldName + ' renamed to ' + country.name });
      });
    });
  })

  // Delete country with this id (accessed at DELETE http://localhost:4000/country/:country_id)
  .delete(function(req, res) {
    Country.remove({
      _id: req.params.country_id
    }, function(err, country) {
      if (err) {
        res.send(err);
        return err;
      }
      res.json({ message: 'Country successfully deleted!'});
    });
  });

module.exports = router;
