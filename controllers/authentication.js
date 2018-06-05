const User = require('../Models/user');
const Jwt = require('jwt-simple');
const config = require('./../config');


function UserToken(user){
    const timestamp = new Date().getTime();
    return Jwt.encode({ sub: user.id, iat: timestamp }, config.secret);

}

exports.signin = function(req, res, next){
    res.send({token: UserToken(req.user)});

};

exports.signup = function(req, res, next){

    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password)
    {        return res.status(422).send({error: "You must provide both Username and Password"});   }

    User.findOne({email : email}, (err, user) => {
        if(err) { return next(err); }

        if(user){
            return res.status(422).send({error: 'Email is in use'});
        }

        const newUser = new User({
            email : email,
            password : password
        });

        newUser.save(function(err){
            if(err){ return next(err); }

            return res.status(200).json({
                token: UserToken(newUser)
            });
        });

    });

};