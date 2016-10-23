// app/models/community.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommunitySchema = new Schema({
  name: String,
  province: {type: Schema.Types.ObjectId, ref: 'Province'}
});

module.exports = mongoose.model('Community', CommunitySchema);
