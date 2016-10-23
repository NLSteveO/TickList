// app/models/gym.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GymSchema = new Schema({
  name: String,
  community: {type: Schema.Types.ObjectId, ref: 'Community'}
});

module.exports = mongoose.model('Gym', GymSchema);
