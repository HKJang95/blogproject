const indexmodel = require('../model/indexpost');

const indexView = async(req, res) => {
    result = await indexmodel.aboutmeAll();
    console.log(result);
    res.render("index", {});
};

const index_AdminView = (req, res) => {
    res.render("index_admin", {});
};

module.exports = {
    indexView,
    index_AdminView
};