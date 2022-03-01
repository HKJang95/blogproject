const express = require('express');
const {aboutme} = require('../controllers/apiController');

const router = express.Router();

router.get('/aboutme', aboutme);

module.exports = router;