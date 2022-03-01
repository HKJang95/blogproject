const indexmodel = require('../model/indexpost');

const aboutme = async(req, res) => {
    result = await indexmodel.aboutmeAll();
    res.render("aboutmeAPI", result);
};

module.exports = {
    aboutme
};