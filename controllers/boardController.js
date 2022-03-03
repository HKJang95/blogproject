const indexmodel = require('../model/indexpost');

const indexView = async(req, res) => {
    post = await indexmodel.aboutmeAll();
    // 홈페이지 소개글 전부 select해서 index.ejs로 pass
    res.render("index", post);
    // render
};

const index_AdminView = async(req, res) => {
    res.render("index_admin", {});
};

module.exports = {
    indexView,
    index_AdminView,
};