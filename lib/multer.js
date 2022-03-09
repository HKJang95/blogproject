const multer = require('multer'); // multipart-data 처리를 통한 파일 업로드를 위한 multer
const multerS3 = require('multer-s3'); // multer를 활용, s3로 파일 업로드
s3 = require('./aws'); // aws config

const multerfilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')){
        cb(null, true);
    } else {
        cb(console.log('Not image file upload tried'), false);
    }
}

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'blogprojectbucket',
        contentType: multerS3.AUTO_CONTENT_TYPE, // content type 들어오는대로 설정
        key: function(req, file, cb){
                cb(null, Date.now() + '.' + file.originalname.split('.').pop()) // 파일 이름 설정을 위한 callback function
        }
    }),
    fileFilter: multerfilter,
},'NONE');

module.exports = upload;