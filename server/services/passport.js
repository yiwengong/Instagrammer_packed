const passport = require('passport');
const User = require('../schema/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const saltPassword = require('../utils/saltPassword');

//Create local Strategy
const localOptions = {usernameField: 'email'}
const localLogin = new LocalStrategy(localOptions,function(email,password,done){
  //Verify this email and password, call done with the user
  //if it is the correct email and password
  //otherwise, call done with false
  User.findOne({email: email}, function(err, user){
    if(err) {return done(err)}
    if(!user) {return done(null, false)}

    // 123 -> (hash_pasword, salt)

    if (saltPassword.doesPasswordMatch(user.password, user.salt, password)) {
      return done(null, user);
    } else {
      return done(null, false);
    }

  });

});

//Set up options for JWT Strategy
const jwtOptions ={
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  //See if the user ID in the payload exists in our database
  //If it does, call'done' with that other
  //otherwise, call done without a user Object
  User.findById(payload.sub, function(err,user) {
    if(err) {return done(err, false)}

    if(user){
      done(null, user);
    }else{
      done(null, false);
    }
  });
});

//Tell passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);
