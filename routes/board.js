const express = require('express');
const {indexView, index_AdminView, index_fetch} = require('../controllers/boardController');

const router = express.Router();

router.get('/', indexView);
router.get('/index_admin', index_AdminView);

module.exports = router;