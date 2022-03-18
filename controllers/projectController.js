const projectmodel = require('../model/projectpost');


const boardView = async(req, res) => {
    post = await projectmodel.projectAll();
    res.render("boardView", post);
};

const postView = async(req, res) => {
    postId = req.params.postId;
    post = await projectmodel.projectGetPostById(postId);
    res.render("postView", post);
};

const postWriteView = (req, res) => {
    res.render("postWrite", {});
}

const postEditView = async(req, res) => {
    postId = req.params.postId;
    post = await projectmodel.projectGetPostById(postId);
    res.render("postEdit", post);
}

module.exports = {
    boardView,
    postView,
    postWriteView,
    postEditView
};