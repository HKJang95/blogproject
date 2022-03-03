const express = require('express');
const { getAboutme, getAboutmeById, insertAboutme, updateAboutme } = require('../controllers/apiController');

const router = express.Router();

router.get('/aboutme', getAboutme);
router.get('/aboutme/:postId', getAboutmeById);
router.post('/insertAboutme', insertAboutme);
router.post('/updateAboutme', updateAboutme);

module.exports = router;