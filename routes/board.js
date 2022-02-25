const express = require('express');
const {indexView} = require('../controllers/boardController');
const router = express.Router();
router.get('/', indexView);
module.exports = router;