const indexmodel = require('../model/indexpost');

const getAboutme = async(req, res) => {
    result = {};
    if(req.params.postId === undefined){
        result = await indexmodel.aboutmeAll();
    } else {
        result = await indexmodel.aboutmeGetPost(req.params.postId);
    }
    res.json(result);
};

const insertAboutme = async(req, res) => {
    result = {};
    if(req.params.postId === undefined){
        result = await indexmodel.aboutmeAll();
    } else {
        result = await indexmodel.aboutmeGetPost(req.params.postId);
    }
    res.json(result);
};


module.exports = {
    getAboutme ,
    insertAboutme
};