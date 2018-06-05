const mongoose = require('mongoose');
const Bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

//Definition of the Model
const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    password: String
});

//On Save hook, excrpyt Password
userSchema.pre('save', function(next) {
    const user  = this;
    Bcrypt.genSalt(10, function(err, salt) {
        if(err){ return next(err); }

        Bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err){return next(err);}

            user.password = hash;
            next();
        });
    });
});


userSchema.methods.comparePassword = function(submittedPassword, callback){
    Bcrypt.compare(submittedPassword, this.password, function(err, isMatch){
        if(err) { return callback(err); }

        callback(null, isMatch);
    });
};

//Creation of the Model Class
const model = mongoose.model('user', userSchema);

//Exporting the Model
module.exports = model;