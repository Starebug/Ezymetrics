
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  source: String,
  Campaign: {type:mongoose.Schema.Types.ObjectId, ref:"Campaign"},
});

module.exports = mongoose.model('Lead', leadSchema);
