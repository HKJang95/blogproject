const db = require('../lib/db');
let User = function(user){
    this.id = user.id
    this.password = user.password;
    this.date = User.date;
}


// index 설명페이지 데이터 전부 가져옴.
User.UserAll = function(){
    // async 처리위해 Promise 사용
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM User", function(err, result, fields){
            if (err) throw err;
            else {
                resolve(result);
            }
        })
    }).catch(error => console.log(error));
}

// index 설명페이지 데이터 id 활용 가져오기
User.GetUserById = function(UserId){
    // async 처리위해 Promise 사용
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM User WHERE id=?",[UserId], function(err, result, fields){
            if (err) throw err;
            else {
                resolve(result);
            }
        })
    }).catch(error => console.log(error));
}

// index 설명페이지 데이터 삽입
User.UserInsert = function(User){
    // async 처리위해 Promise 사용
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO User (id, password, date) SELECT(?,SHA2(?,256),now())",[User.id, User.password], function(err, result, fields){
            if (err) throw err;
            else {
                console.log(result.insertId);
                resolve(result.insertId);
            }
        })
    }).catch(error => console.log(error));
}

// index 설명페이지 데이터 삭제
User.UserDelete = function(id){
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM User WHERE id=?",[id], function(err, result, fields){
            if (err) throw err;
            else {
                console.log(result);
                resolve(result);
            }
        })
    }).catch(error => console.log(error));
}

// index 설명페이지 데이터 update
User.UserUpdate = function(User){
    return new Promise((resolve, reject) => {
        db.query("UPDATE User SET id=?, password=SHA2(?,256) WHERE id=?",[User.id, User.password], function(err, result, fields){
            if (err) throw err;
            else {
                console.log(result);
                resolve(result);
            }
        })
    }).catch(error => console.log(error));
}
    
module.exports = User;