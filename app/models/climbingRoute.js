// app/models/climbingRoute.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClimbingRouteSchema = new Schema({
  name: String,
  grade: String,
  location: {
    isGym: Boolean,
    gym: {type: Schema.Types.ObjectId, ref: 'Gym'},
    crag: {type: Schema.Types.ObjectId, ref: 'Crag'}
  }
});

module.exports = mongoose.model('ClimbingRoute', ClimbingRouteSchema);
