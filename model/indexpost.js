const db = require('../lib/db');
const sanitizeHtml = require('sanitize-html');
const asyncHandler = require('express-async-handler');

// index 설명페이지 데이터 전부 가져옴.
exports.aboutmeAll = function(){
    // async 처리위해 Promise 사용
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM aboutme", function(err, result, fields){
            if (err) throw err;
            else {
                resolve(result);
            }
        })
    }).catch(error => console.log(error));
}
    
