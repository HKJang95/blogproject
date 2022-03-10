const express = require('express');
const {boardView, postView, postWriteView} = require('../controllers/projectController');

const router = express.Router();

router.get('/', boardView);
router.get('/post/:postId', postView);
router.get('/write', postWriteView);

module.exports = router;