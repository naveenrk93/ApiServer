const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// const requireAuth = passport.authenticate('jwt', {session: false});

const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app){

    // app.get('/', requireAuth, function(req, res){
    //     res.send({"Hi":" there"});
    // });

    app.post('/saml/acs', passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }), function(req, res) {
        res.redirect('/');
    });

    app.post('/signup', Authentication.signup);

    app.post('/signin', requireSignin, Authentication.signin);

    app.get('/login', passport.authenticate('saml', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    app.post('/requesturi/saml/acs', passport.authenticate('saml', {
        failureRedirect: '/login',
        failureFlash: true
    }), function (req, res) {

        console.log("Success!!!");
    });

    app.get('/ssocallback', function (req, res) {
       console.log(JSON.stringify(req));
    });

};