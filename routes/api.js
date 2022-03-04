const express = require('express');
const { getAboutme, getAboutmeById, insertAboutme, updateAboutme, deleteAboutme } = require('../controllers/apiController');

const router = express.Router();

router.get('/aboutme', getAboutme);
router.get('/aboutme/:postId', getAboutmeById);
router.post('/insertAboutme', insertAboutme);
router.post('/updateAboutme/:postId', updateAboutme);
router.post('/deleteAboutme/:postId', deleteAboutme);

module.exports = router;