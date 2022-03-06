const indexmodel = require('../model/indexpost');
const s3 = require('../lib/aws');
const fs = require('fs');
// mysql myblog DB aboutme table;

// @ get
// /api/aboutme
const getAboutme = async(req, res) => {
    var result = {};
    result = await indexmodel.aboutmeAll(); // 전체 aboutme table data 소환
    res.json(result);
};

// @ get
// /abi/aboutme/:postId
const getAboutmeById = async(req, res) => {
    var result = {};
    if(req.params.postId === undefined) {
        result = {id:'', title:'', content:'', image_src:''}; // postId가 넘어오지 않았다면 빈 객체 반환
    } else {
        result = await indexmodel.aboutmeGetPost(req.params.postId); // id로 특정 aboutme dataset 찾음
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
        var imgurl = ''
        if(postPhoto !== '' || postPhoto !== undefined){
            imgurl = await imageUpload(postPhoto); // 여기 이미지 경로 제대로 받아오기!
        }
        var jsonPost = {id:postId, title:postTitle, content:postContent, image_src:imgurl}
        duplicateCheck = await indexmodel.aboutmeGetPost(postId); // select by postId로 중복 check
        if(Object.keys(duplicateCheck).length < 1){
            result = await indexmodel.aboutmeInsert(jsonPost); // 중복 없다면 insert
        } else {
            console.log('DB insert fail due to duplicate : insertAboutme');
        }
    }
    res.redirect('/');
};

// @post
// /api/updateAboutme/:postId
const updateAboutme = async(req, res) => {
    var { postId, postTitle, postContent, postPhoto } = req.body;
    var duplicateCheck = {}
    var result = {}
    if(postId === undefined){
        console.log('Failed to parse json for : updateAboutme');
    } else {
        var jsonPost = {id:postId, title:postTitle, content:postContent, image_src:postPhoto}
        duplicateCheck = await indexmodel.aboutmeGetPost(postId); // select by postId로 중복 check
        if(Object.keys(duplicateCheck).length >= 1){
            result = await indexmodel.aboutmeUpdate(jsonPost); // 기존 data 있으면 update
        } else {
            console.log('DB Update fail due to updating non-existing data : updateAboutme');
        }
    }
    res.redirect('/');
};

// @Post
// /api/deleteAboutme/:postId
const deleteAboutme = async(req, res) => {
    var { postId } = req.body;
    var duplicateCheck = {}
    var result = {}
    if(postId === undefined){
        console.log('Failed to parse json for : deleteAboutme');
    } else {
        duplicateCheck = await indexmodel.aboutmeGetPost(postId); // select by postId로 중복 check
        if(Object.keys(duplicateCheck).length >= 1){
            result = await indexmodel.aboutmeDelete(postId); // 기존 data 있으면 delete
            
            console.log(postId);
        } else {
            console.log('DB delete fail due to deleting non-existing data : deleteAboutme');
        }
    }
    res.redirect('/');
}

// s3 bucket image upload
const imageUpload = function(img_path){
    return new Promise((resolve, reject) => {
        const fileContent = fs.readFileSync(img_path);

        const params = {
            Bucket: 'blogprojectbucket',
            Key:'test2.jpg',
            Body:fileContent,
            ContentType:'image/jpeg'
        };

        s3.upload(params, function(err, data){
            if(err){ throw err; }
            console.log(`File upload success. ${data.Location}`);
            resolve(data.Location);
        })
    }).catch(error => console.log(error));
}

module.exports = {
    getAboutme ,
    getAboutmeById,
    insertAboutme,
    updateAboutme,
    deleteAboutme
};