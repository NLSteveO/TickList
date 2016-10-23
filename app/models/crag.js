// app/models/crag.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CragSchema = new Schema({
  name: String,
  community: {type: Schema.Types.ObjectId, ref: 'Community'}
});

module.exports = mongoose.model('Crag', CragSchema);
