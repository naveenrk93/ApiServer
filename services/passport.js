const passport = require('passport');
const User = require('./../Models/user');
const config = require('./../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Create Local Strategy
const LocalOptions = { usernameField:'email'};
const LocalLogin = new LocalStrategy(LocalOptions, function(email, password, done){

    User.findOne({ email: email }, function(err, user){
        if(err)     { return done(err);         }
        if(!user)   { return done(null, false); }

        user.comparePassword(password, function(err, isMatch){
            if(err)     {   return done(err);           }
            if(!isMatch){   return done(null, false);   }

            return done(null, user);
        });
    });
});

//Options for Jwt Strategy
const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

//Create Jwt Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {

    User.findById(payload.sub, function(err, user){
        if(err){  return done(err, false);  }

        if(user){ return done(null, user);  }
        else    { return done(null, false);  }
    });
});

//Tell Passport to use this strategy
passport.use(jwtLogin);
passport.use(LocalLogin);