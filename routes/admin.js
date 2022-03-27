// /admin
const express = require('express');
const { loginView, logoutProcess } = require('../controllers/adminController');

const router = express.Router();

module.exports = function(passport){ // passport 자체를 객체로 받아야 하기 때문에.... 

    router.get('/login', loginView);

    router.post('/loginProcess', passport.authenticate('local',{
            successRedirect : '/',
            failureRedirect: '/admin/login',
            failureFlash: true
        })
    );

    router.get('/logoutProcess', logoutProcess);

    return router;
};