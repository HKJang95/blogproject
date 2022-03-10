const indexmodel = require('../model/indexpost');

const boardView = async(req, res) => {
    res.render("boardView", {});
};

const postView = async(req, res) => {
    res.render("postView", {});
};

const postWriteView = (req, res) => {
    res.render("postWrite", {});
}

module.exports = {
    boardView,
    postView,
    postWriteView
};