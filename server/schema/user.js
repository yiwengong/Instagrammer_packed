const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define our model
const UserSchema = new Schema({
  username:{
    type: String,
    unique: true,
    required: [true, 'Name is required!']
  },
  password: {
    type: String,
    validate: {
      validator: (password) => password.length > 6,
      message:'Password must be longer than 6 characters.'
    }
  },
  avatar:{
    type: String,
    default: 'default.png'
  },
  name: String,
  website: String,
  email:{
    type: String,
    unique:true,
    lowercase:true,
    require:true
  },
  phonenumber: Number,
  gender: String,
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
});

UserSchema.virtual('followingCount').get(function(){
  return this.following.length;
});

UserSchema.virtual('followersCount').get(function(){
  return this.followers.length;
});

UserSchema.virtual('postsCount').get(function(){
  return this.posts.length;
});

//On Save Hook, encrypt password
//Before saving a model, run this function
UserSchema.pre('save', function(next) {
  //get access to the user model
  const user = this;

  //generate a salt then run callback,
  bcrypt.genSalt(10, function(err, salt) {
    if(err) {return next(err)}

    //hash(encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) {return next(err)}

      //overwrite plain text password with encrypt password
      user.password = hash;
      next();

    });
  })
});

UserSchema.methods.comparePassword = function(candidatePassword,callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err) {return callback(err)}
    callback(null, isMatch);
  });
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
