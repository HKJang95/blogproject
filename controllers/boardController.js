const indexmodel = require('../model/indexpost');

const indexView = async(req, res) => {
    result = await indexmodel.aboutmeAll();
    // 홈페이지 소개글 전부 select해서 index.ejs로 pass
    res.render("index", result);
    // render
};

const index_AdminView = async(req, res) => {
    result = await indexmodel.aboutmeAll();
    res.render("index_admin", result);
};

module.exports = {
    indexView,
    index_AdminView,
};