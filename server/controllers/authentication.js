const jwt =require('jwt-simple');
const config = require('../config');
const User = require('../schema/user');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp},config.secret);
}

module.exports.signin = function(req,res,next) {
  //req.user from passport
  res.send({token:tokenForUser(req.user) });
};

module.exports.signup = function(req, res, next) {

  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if(!email || !password ||!username) {
    return res.status(422).send({error:'You must provide username, email and password'});
  }

  //See if a user with the given email exists
  User.findOne({email: email}, function(err, existingUser) {
    if(err) {return next(err)}
    // If a user with email does exist, return an error
    if(existingUser) {
      return res.status(422).send({error:'Email is in use'});
    }

    // If a user with emial does NOT exist, create and save user record
    const user = new User({
      email: email,
      username: username,
      password: password
    });

    user.save(function(err){
      if(err) {return next(err)}

      // Repond to request indicating the user was created
      res.json({token: tokenForUser(user)});
    });
  })
};
