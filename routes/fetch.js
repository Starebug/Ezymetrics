
const express = require('express');
const {getInfo, getLeads, getCampaigns} = require('../Controllers/process.controller');
const router = express.Router();

router.get('/',getInfo);
router.get('/leads',getLeads);
router.get('/campaigns',getCampaigns);
module.exports = router;
