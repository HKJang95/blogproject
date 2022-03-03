/*
    index 페이지 내 소개란 데이터를 가져오기 위한 Model
*/
const db = require('../lib/db');
const sanitizeHtml = require('sanitize-html');
const asyncHandler = require('express-async-handler');

let Post = function(post){
    this.id = post.id
    this.title = post.title;
    this.content = post.content;
    this.image_src = image_src;
}

// index 설명페이지 데이터 전부 가져옴.
Post.aboutmeAll = function(){
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
Post.aboutmeGetPost = function(postId){
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
Post.aboutmeInsert = function(post){
    // async 처리위해 Promise 사용
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO aboutme (id, title, content, image_src) VALUES(?,?,?,?)",[post.id, post.title, post.content, post.image_src], function(err, result, fields){
            if (err) throw err;
            else {
                console.log(result.insertId);
                resolve(result.insertId);
            }
        })
    }).catch(error => console.log(error));
}

// index 설명페이지 데이터 삭제
Post.aboutmeDelete = function(id){
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM aboutme WHERE id=?",[id], function(err, result, fields){
            if (err) throw err;
            else {
                console.log(result);
                resolve(result);
            }
        })
    }).catch(error => console.log(error));
}

// index 설명페이지 데이터 update
Post.aboutmeUpdate = function(post){
    return new Promise((resolve, reject) => {
        db.query("UPDATE aboutme SET id=?, title=?,content=?,image_src=? WHERE id=?",[post.id, post.title, post.content, post.image_src, post.id], function(err, result, fields){
            if (err) throw err;
            else {
                console.log(result);
                resolve(result);
            }
        })
    }).catch(error => console.log(error));
}
    
module.exports = Post;