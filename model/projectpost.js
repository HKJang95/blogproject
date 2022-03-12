/*
    index 페이지 내 소개란 데이터를 가져오기 위한 Model
*/
const db = require('../lib/db');
const sanitizeHtml = require('sanitize-html');

let Post = function(post){
    this.id = post.id
    this.title = post.title;
    this.content = post.content;
    this.author = post.author;
}

// project post 데이터 전부 가져옴.
Post.projectAll = function(){
    // async 처리위해 Promise 사용
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM projectPost", function(err, result, fields){
            if (err) throw err;
            else {
                resolve(result);
            }
        })
    }).catch(error => console.log(error));
}

// project post 설명페이지 데이터 id 활용 가져오기
Post.projectGetPostById = function(postId){
    // async 처리위해 Promise 사용
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM projectPost WHERE id=?",[postId], function(err, result, fields){
            if (err) throw err;
            else {
                resolve(result);
            }
        })
    }).catch(error => console.log(error));
}

// project post 설명 페이지 저자id 활용 가져오기
Post.projectGetPostByAuthor = function(author){
    // async 처리위해 Promise 사용
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM projectPost WHERE author LIKE %?%",[author], function(err, result, fields){
            if (err) throw err;
            else {
                resolve(result);
            }
        })
    }).catch(error => console.log(error));
}

// project post 설명 페이지 title 활용 가져오기
Post.projectGetPostByTitle = function(title){
    // async 처리위해 Promise 사용
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM projectPost WHERE title LIKE %?%",[title], function(err, result, fields){
            if (err) throw err;
            else {
                resolve(result);
            }
        })
    }).catch(error => console.log(error));
}

// project post 설명 페이지 content 활용 가져오기
Post.projectGetPostByContent = function(content){
    // async 처리위해 Promise 사용
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM projectPost WHERE content LIKE %?%",[content], function(err, result, fields){
            if (err) throw err;
            else {
                resolve(result);
            }
        })
    }).catch(error => console.log(error));
}

// project 설명페이지 데이터 삽입
Post.projectInsert = function(post){
    // async 처리위해 Promise 사용
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO project (id, title, content, author) VALUES(?,?,?,?)",[post.id, post.title, post.content, post.author], function(err, result, fields){
            if (err) throw err;
            else {
                console.log(result.insertId);
                resolve(result.insertId);
            }
        })
    }).catch(error => console.log(error));
}

// project 설명페이지 데이터 삭제
Post.projectDelete = function(id){
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM project WHERE id=?",[id], function(err, result, fields){
            if (err) throw err;
            else {
                console.log(result);
                resolve(result);
            }
        })
    }).catch(error => console.log(error));
}

// project 설명페이지 데이터 update
Post.projectUpdate = function(post){
    return new Promise((resolve, reject) => {
        db.query("UPDATE project SET id=?, title=?,content=?,author=? WHERE id=?",[post.id, post.title, post.content, post.author, post.id], function(err, result, fields){
            if (err) throw err;
            else {
                console.log(result);
                resolve(result);
            }
        })
    }).catch(error => console.log(error));
}
    
module.exports = Post;