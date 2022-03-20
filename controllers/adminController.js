const projectmodel = require('../model/user');

const loginView = async(req, res) => {
    res.render("loginView", {});
};

module.exports = {
    loginView
};