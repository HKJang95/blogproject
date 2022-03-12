const express = require('express');
const { getAboutme, getAboutmeById, insertAboutme, updateAboutme, deleteAboutme, insertImage, insertPost } = require('../controllers/apiController');
const upload = require('../lib/multer');

const router = express.Router();

router.get('/aboutme', getAboutme);
router.get('/aboutme/:postId', getAboutmeById);
router.post('/insertAboutme', upload.single('postPhoto'), insertAboutme);
router.post('/updateAboutme/:postId',upload.single('postPhoto'), updateAboutme);
router.post('/deleteAboutme/:postId',upload.single(), deleteAboutme);
router.post('/insertImage', upload.single('img'), insertImage);
router.post('/insertPost',insertPost)

module.exports = router;