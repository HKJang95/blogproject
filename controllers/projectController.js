const projectmodel = require('../model/projectpost');

const boardView = async(req, res) => {
    searchInput = req.query.searchInput;
    if(searchInput === undefined){
        post = await projectmodel.projectAll();
    } else {
        post = await projectmodel.projectGetPostByTitle(searchInput);
    }
    adminLogin = false;
    if(req.user === 'admin'){
        adminLogin = true;
    }
    res.render("boardView", {post, adminLogin, searchInput});
};

const postView = async(req, res) => {
    postId = req.params.postId;
    adminLogin = false;
    if(req.user === 'admin'){
        adminLogin = true;
    }
    post = await projectmodel.projectGetPostById(postId);
    res.render("postView", {post, adminLogin});
};

const postWriteView = (req, res) => {
    adminLogin = false;
    if(req.user === 'admin'){
        adminLogin = true;
    }
    res.render("postWrite", {adminLogin});
}

const postEditView = async(req, res) => {
    postId = req.params.postId;
    adminLogin = false;
    if(req.user === 'admin'){
        adminLogin = true;
    }
    post = await projectmodel.projectGetPostById(postId);
    res.render("postEdit", {post, adminLogin});
}

module.exports = {
    boardView,
    postView,
    postWriteView,
    postEditView
};