const express = require('express');
const {getinfo, generatePDF, generateCSV} = require('../Controllers/process.controller');
const router = express.Router();

router.get('/',getinfo);
router.get('/pdf',generatePDF);
router.get('/csv',generateCSV);

module.exports = router;
