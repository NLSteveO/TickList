// app/routes/provinceRouter.js

var express = require('express');
var router = express.Router();
var Province = require('../models/province');
var Country = require('../models/country');

router.route('/')

  // Get all provinces (accessed at GET http://localhost:4000/province)
  .get(function(req, res) {
    Province.find(function(err, provinces) {
      if (err) {
        res.send(err);
        return err;
      }
      res.render('province', { title: 'Province List', provinces: provinces });
    });
  })

  // Create province (accessed at POST http://localhost:4000/province)
  .post(function(req, res) {
    var province = new Province();

    Country.findById(req.body.country, function(err, country) {
      if (err) {
        res.send(err);
        return err;
      }
      province.name = req.body.name;
      province.country = country;

      province.save(function(err) {
        if (err) {
          res.send(err);
          return err;
        }
        res.json({ message: 'Province ' + province.name + ' created in ' + province.country.name + '!'});
      });
    });
  });

router.route('/:province_id')

  // Get province with this id (accessed at GET http://localhost:4000/province/:province_id)
  .get(function(req, res) {
    Province.findById(req.params.province_id, function(err, province) {
      if (err) {
        res.send(err);
        return err;
      }

      res.json(province);
    })
  })

  // Update province with this id (accessed at PUT http://localhost:4000/province/:province_id)
  .put(function(req, res) {
    Province.findById(req.params.province_id, function(err, province) {
      if (err) {
        res.send(err);
        return err;
      }
      var oldName = province.name;
      province.name = req.body.name;
      province.save(function(err) {
        if (err) {
          res.send(err);
          return err;
        }

        res.json({ message: oldName + ' renamed to ' + province.name });
      });
    });
  })

  // Delete province with this id (accessed at DELETE http://localhost:4000/province/:province_id)
  .delete(function(req, res) {
    Province.remove({
      _id: req.params.province_id
    }, function(err, province) {
      if (err) {
        res.send(err);
        return err;
      }
      res.json({ message: 'Province successfully deleted!'});
    });
  });

router.route('/in/:country_id')

  // Get provinces in country with this id (accessed at GET http://localhost:4000/province/in/:country_id)
  .get(function(req, res) {
    Province.find({ country: req.params.country_id }, function(err, provinces) {
      if (err) {
        res.send(err);
        return err;
      }

      Country.findById(req.params.country_id, function(err, country) {
        if (err) {
          res.send(err);
          return err;
        }

        res.render('province', { title: 'List of provinces in ' + country.name, provinces: provinces });
      })
    });
  });

module.exports = router;
