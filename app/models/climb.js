// app/models/climb.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClimbSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Climb', ClimbSchema);
