const express = require('express');
const {boardView, postView, postWriteView} = require('../controllers/projectController');

const router = express.Router();

router.get('/', boardView);
router.get('/write', postWriteView);
router.get('/:postId', postView);

module.exports = router;