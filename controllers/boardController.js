const indexmodel = require('../model/indexpost');

const indexView = async(req, res) => {
    post = await indexmodel.aboutmeAll();
    adminLogin = false;
    if(req.user === 'admin'){
        adminLogin = true;
    }
    // 홈페이지 소개글 전부 select해서 index.ejs로 pass
    res.render("index", {post, adminLogin});
    // render
};

const index_AdminView = async(req, res) => {
    adminLogin = false;
    if(req.user === 'admin'){
        adminLogin = true;
    }
    res.render("index_admin", {adminLogin});
};

module.exports = {
    indexView,
    index_AdminView,
};