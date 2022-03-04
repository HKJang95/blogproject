// file명 "aws"로 바꿔야 함.
// 파일 업로드 위한 aws s3 bucket용 정보 저장
const aws = require('aws-sdk');
const id = '';
const secret = '';
const s3 = new aws.S3({ accessKeyId:id, secretAccessKey:secret });

module.exports = s3;