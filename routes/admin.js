// /admin

const express = require('express');
const {loginView} = require('../controllers/adminController');

const router = express.Router();

router.get('/login', loginView);

module.exports = router;