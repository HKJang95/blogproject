const indexmodel = require('../model/indexpost');

// @ get
// /api/aboutme
const getAboutme = async(req, res) => {
    var result = {};
    result = await indexmodel.aboutmeGetPost(req.params.postId);
    // id로 특정 aboutme dataset 찾음
    res.json(result);
};

// @ get
// /abi/aboutme/:postId
const getAboutmeById = async(req, res) => {
    var result = {};
    if(req.params.postId === undefined) {
        result = {id:'', title:'', content:'', image_src:''};
    } else {
        result = await indexmodel.aboutmeGetPost(req.params.postId);
        // id로 특정 aboutme dataset 찾음
    }
    res.json(result);
}

// @post
// /api/insertAboutme
const insertAboutme = async(req, res) => {
    var { postId, postTitle, postContent, postPhoto } = req.body;
    var duplicateCheck = {}
    var result = {}
    if(postId === undefined){
        console.log('Failed to parse json for : insertAboutme');
    } else {
        var jsonPost = {id:postId, title:postTitle, content:postContent, image_src:postPhoto}
        duplicateCheck = await indexmodel.aboutmeGetPost(postId);
        if(Object.keys(duplicateCheck).length < 1){
            result = await indexmodel.aboutmeInsert(jsonPost);
        } else {
            console.log('DB insert fail due to duplicate : insertAboutme');
        }
    }
    res.redirect('/');
};

// @post
// /api/changeAboutme/:postId
const updateAboutme = async(req, res) => {
    var { postId, postTitle, postContent, postPhoto } = req.body;
    var duplicateCheck = {}
    var result = {}
    if(postId === undefined){
        console.log('Failed to parse json for : updateAboutme');
    } else {
        var jsonPost = {id:postId, title:postTitle, content:postContent, image_src:postPhoto}
        duplicateCheck = await indexmodel.aboutmeGetPost(postId);
        if(Object.keys(duplicateCheck).length >= 1){
            result = await indexmodel.aboutmeUpdate(jsonPost);
        } else {
            console.log('DB Update fail due to updating non-existing data : updateAboutme');
        }
    }
    res.redirect('/');
};


module.exports = {
    getAboutme ,
    getAboutmeById,
    insertAboutme,
    updateAboutme
};