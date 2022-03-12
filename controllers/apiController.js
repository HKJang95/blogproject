const indexmodel = require('../model/indexpost');
const projectmodel = require('../model/projectpost');
const s3 = require('../lib/aws');
const fs = require('fs');
const urlparser = require('url');

////////////////////////////// aboutme API ////////////////////////////////////////////////////////////
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
        if(req.file !== undefined) {
            var imgurl = req.file.location; // router에서 붙인 multer가 반환한 url (aws s3 object url)
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
        duplicateCheck = await indexmodel.aboutmeGetPost(postId); // select by postId로 중복 check
        var imgurl = duplicateCheck[0].image_src;
        if(req.file !== undefined){ // 새로운 파일이 업로드 된 경우
            await deleteImageFromS3(imgurl); // 기존 image delete
            var imgurl = req.file.location; // 새로운 이미지 업로드 결과
        }
        var jsonPost = {id:postId, title:postTitle, content:postContent, image_src:imgurl}
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
            await deleteImageFromS3(duplicateCheck[0].image_src); // image_src의 url에 해당하는 s3 object 삭제
            result = await indexmodel.aboutmeDelete(postId); // 기존 data 있으면 delete
            console.log('delete ' + postId + ' complete!');
        } else {
            console.log('DB delete fail due to deleting non-existing data : deleteAboutme');
        }
    }
    res.redirect('/');
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////// (project) post API /////////////////////////////////////////////////////////
// @post
// /api/insertPost
const insertPost = async(req, res) => {
    console.log(req.body);

    // var { postId, postTitle, postContent, author } = req.body;
    // var duplicateCheck = {}
    // var result = {}
    // if(postId === undefined){
    //     console.log('Failed to parse json for : insertPost');
    // } else {
    //     var jsonPost = {id:postId, title:postTitle, content:postContent, author:author}
    //     duplicateCheck = await indexmodel.projectGetPostById(postId); // select by postId로 중복 check
    //     if(Object.keys(duplicateCheck).length < 1){
    //         result = await indexmodel.projectInsert(jsonPost); // 중복 없다면 insert
    //     } else {
    //         console.log('DB insert fail due to duplicate : insertAboutme');
    //     }
    // }
    // res.redirect('/');
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// inner function /////////////////////////////////////////////////////////
//////////////////////////// !!!!!!!! DO NOT EXPORT !!!!!!!!!!! /////////////////////////////////////////
// AWS S3의 이미지 삭제
const deleteImageFromS3 = async(imgUrl) => { 
    if(imgUrl === null || imgUrl === undefined){ }
    else {
        var urlObj = urlparser.parse(imgUrl, true); 
        var targetObject = urlObj.path; // image url에서 object해당 부분만 파싱
        targetObject = targetObject.replace('/', ''); // '/' 문자 지움
        var params = {Bucket: 'blogprojectbucket', Key: targetObject};

        s3.deleteObject(params, function(err, data){ // s3 bucket 접근, object 삭제
            if (err) {
                throw err;
            }
            else { 
                console.log('object '+targetObject+' delete complete.');
            }
        })
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////// etc /////////////////////////////////////////////////////////////////////////
// @post
// /api/insertImage
const insertImage = async(req, res) => {
    
    imgurl = '';
    if(req.file !== undefined) {
        var imgurl = req.file.location; // router에서 붙인 multer가 반환한 url (aws s3 object url)
    }
    res.json(imgurl);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
    getAboutme ,
    getAboutmeById,
    insertAboutme,
    updateAboutme,
    deleteAboutme,
    insertImage,
    insertPost
};