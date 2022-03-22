// /project

const express = require('express');
const {boardView, postView, postWriteView, postEditView} = require('../controllers/projectController');

const router = express.Router();

router.get('/', boardView);
router.get('/write', postWriteView);
router.get('/edit/:postId', postEditView);
router.get('/view/:postId', postView);
