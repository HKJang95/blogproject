/*
    index 페이지 내 소개란 데이터를 가져오기 위한 Model
*/


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

// index 설명페이지 데이터 id 활용 가져오기
exports.aboutmeGetPost = function(postId){
    // async 처리위해 Promise 사용
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM aboutme WHERE id=?",[postId], function(err, result, fields){
            if (err) throw err;
            else {
                resolve(result);
            }
        })
    }).catch(error => console.log(error));
}

// index 설명페이지 데이터 삽입
/*
    -- args --
    aboutmeJson : aboutme Json Object -> [id, title, content, image_src]
*/
exports.aboutmeInsert = function(aboutmeJson){
    if(aboutmeJson !== undefined){
        var aboutme = JSON.parse(aboutmeJson);
        // async 처리위해 Promise 사용
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO aboutme(id, title, content, image_src) VALUES=?,?,?,?",[aboutme.id, aboutme.title, aboutme.content, aboutme.image_src], function(err, result, fields){
                if (err) throw err;
                else {
                    resolve(result);
                }
            })
        }).catch(error => console.log(error));
    } else {
        return {};
    }
}
    
