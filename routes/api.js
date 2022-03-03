const express = require('express');
const { getAboutme, insertAboutme } = require('../controllers/apiController');

const router = express.Router();

router.get('/aboutme', getAboutme);
router.get('/aboutme/:postId', getAboutme);
router.post('/addAboutme/:postId', insertAboutme);

module.exports = router;