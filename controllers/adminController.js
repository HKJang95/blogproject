const loginView = async(req, res) => {
    adminLogin = false;
    if(req.user === 'admin'){
        adminLogin = true;
    }
    res.render("loginView", {adminLogin});
};

const logoutProcess = (req, res) => { // logout 프로세스
    req.logout(); // logout
    req.session.destroy(function(err){ // session destroy (완전한 로그아웃 위해)
        res.redirect(302,`/`);
        res.end();
    });
}

module.exports = {
    loginView,
    logoutProcess,
};