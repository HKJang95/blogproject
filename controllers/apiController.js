const indexmodel = require('../model/indexpost');
const projectmodel = require('../model/projectpost');
const s3 = require('../lib/aws');
const urlparser = require('url');
const nanoid = require('nanoid');
const parser = require('node-html-parser');

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
    var adminLogin = false;
    if(req.user === 'admin'){
        adminLogin = true;
    }

    if(adminLogin){ // admin 계정만 활용 가능.
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
    } else {
        console.log('access denied. please login. : insertAboutme');
    }
    res.redirect('/');
};

// @post
// /api/updateAboutme/:postId
const updateAboutme = async(req, res) => {

    var adminLogin = false;
    if(req.user === 'admin'){
        adminLogin = true;
    }
    if(adminLogin){ // admin 계정만 활용 가능.
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
    } else {
        console.log('access denied. please login. : updateAboutme');
    }
    res.redirect('/');
};

// @Post
// /api/deleteAboutme/:postId
const deleteAboutme = async(req, res) => {
    var adminLogin = false;
    if(req.user === 'admin'){
        adminLogin = true;
    }
    if(adminLogin){ // admin 계정만 활용 가능.
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
    } else {
        console.log('access denied. please login. : deleteAboutme');
    }
    res.redirect('/');
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////// (project) post API /////////////////////////////////////////////////////////
// @post
// /api/insertPost
const insertPost = async(req, res) => {
    var adminLogin = false;
    if(req.user === 'admin'){
        adminLogin = true;
    }
    if(adminLogin){ // admin 계정만 활용 가능.
        var postTitle = req.body.postTitle;
        var postContent = req.body.editordata;
        var postId = nanoid.nanoid();
        var author = ''
        var duplicateCheck = {}
        var result = {}
        var thumbnail = ''
        if(postId === undefined){
            console.log('Failed to parse json for : insertPost');
        } else {
            const thumbnailURL = thumbnailParser(postContent);
            if(thumbnailURL !== null){
                var jsonPost = {id:postId, title:postTitle, content:postContent, author:author, thumbnail:thumbnailURL}
                // 이미지가 한 개 이상 삽입되어 있으면 썸네일로 첫번째 이미지 활용
            } else {
                var jsonPost = {id:postId, title:postTitle, content:postContent, author:author} // 없으면 default img
            }
            duplicateCheck = await projectmodel.projectGetPostById(postId); // select by postId로 중복 check
            if(Object.keys(duplicateCheck).length < 1){
                result = await projectmodel.projectInsert(jsonPost); // 중복 없다면 insert
            } else {
                console.log('DB insert fail due to duplicate : insertPost');
            }
        }
        res.redirect(`/project/view/${postId}`);
    } else {
        console.log('access denied. please login. : insertPost');
        res.redirect('/');
    }
};

// @post
// /api/deletePost/:postId
const deletePost = async(req, res) => {
    var adminLogin = false;
    if(req.user === 'admin'){
        adminLogin = true;
    }
    if(adminLogin){ // admin 계정만 활용 가능.
        var { postId } = req.body;
        var duplicateCheck = {}
        var result = {}
        if(postId === undefined){
            console.log('Failed to parse json for : deletePost');
        } else {
            duplicateCheck = await projectmodel.aboutmeGetPost(postId); // select by postId로 중복 check
            if(Object.keys(duplicateCheck).length >= 1){
                await deleteImageFromS3(duplicateCheck[0].thumbnail); // thumbnail의 url에 해당하는 s3 object 삭제
                result = await projectmodel.aboutmeDelete(postId); // 기존 data 있으면 delete
                console.log('delete ' + postId + ' complete!');
            } else {
                console.log('DB delete fail due to deleting non-existing data : deletePost');
            }
        }
    } else {
        console.log('access denied. please login. : deletePost');
    }
    res.redirect('/project');
};

// @post
// /api/updatePost/:postId
const updatePost = async(req, res) => {
    var adminLogin = false;
    if(req.user === 'admin'){
        adminLogin = true;
    }
    if(adminLogin){ // admin 계정만 활용 가능.
        var { postId, postTitle, editordata } = req.body;
        var duplicateCheck = {}
        var result = {}
        if(postId === undefined){
            console.log('Failed to parse json for : updatePost');
        } else {
            duplicateCheck = await projectmodel.projectGetPostById(postId); // select by postId로 중복 check
            var thumbnailURL = thumbnailParser(editordata);
            console.log(thumbnailURL);
            var jsonPost = {id:postId, title:postTitle, content:editordata, thumbnail:thumbnailURL};
            if(Object.keys(duplicateCheck).length >= 1){
                result = await projectmodel.projectUpdate(jsonPost); // 기존 data 있으면 update
            } else {
                console.log('DB Update fail due to updating non-existing data : updatePost');
            }
        }
        res.redirect(`/project/view/${postId}`);
    } else {
        console.log('access denied. please login. : deletePost');
        res.redirect('/project');
    }
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

// html content의 첫번째 image 주소 반환
const thumbnailParser = (rawURL) => { 
    const root = parser.parse(rawURL);
    const attrs = root.getElementsByTagName('img')
    if(attrs.length >= 1){
        return attrs[0].attributes['src'];
    } else {
        return null;
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
    insertPost,
    deletePost,
    updatePost
};