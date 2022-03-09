const express = require('express');
const { getAboutme, getAboutmeById, insertAboutme, updateAboutme, deleteAboutme } = require('../controllers/apiController');
const upload = require('../lib/multer');

const router = express.Router();

router.get('/aboutme', getAboutme);
router.get('/aboutme/:postId', getAboutmeById);
router.post('/insertAboutme', upload.single('postPhoto'), insertAboutme);
router.post('/updateAboutme/:postId',upload.single(), updateAboutme);
router.post('/deleteAboutme/:postId',upload.single(), deleteAboutme);

module.exports = router;