// app/models/province.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProvinceSchema = new Schema({
  name: String,
  country: {type: Schema.Types.ObjectId, ref: 'Country'}
});

module.exports = mongoose.model('Province', ProvinceSchema);
