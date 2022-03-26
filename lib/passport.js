/* 
for mysql passport
args : app : express() object
*/
module.exports = function(app){
    const usermodel = require('../model/user');
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){ // 세션에 저장할 정보..
        done(null, user);
    })

    passport.deserializeUser(function(id, done){ // 페이지마다 세션에서 보일 정보.
        done(null, id);
    })

    passport.use(new LocalStrategy(
        {
        usernameField:'inputId', passwordField:'inputPassword'},
            async function(username, password, done){
                var result = await usermodel.authenticate(username, password);
                if(result.length === 0){
                    return done(null, false, {message : 'Access Denied.'});
                } else {
                    return done(null, result[0].id);
                }
        }));
    return passport;
}
