
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  id: Number,
  Campaign_Id: String,
  status: String,
});

module.exports = mongoose.model('Campaign', campaignSchema);
