const User = require('../schema/user');
const Post = require('../schema/post');
const saltPassword = require('../utils/saltPassword');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {

  //update a user
  update: function(req, res, next) {
    const userId = req.params.userId;
    const userProps = req.body;
    User.findByIdAndUpdate({_id: userId}, userProps)
      .then(()=>User.findById({_id: userId}))
      .then((user)=> {res.send(user)})
      .catch(next);
  },

  //find a user
  find: function(req,res,next) {

    const username = req.params.username;
    User.findOne({username: username})
      .then((user) => {res.send(user)})
      .catch(next);
  },

  //find the user's own info
  findUserInfo: function(req,res,next) {
    res.send(req.user);
  },

  //Edit user's password
  changePassword: function(req,res,next) {
    const {user} = req;
    const {oldPassword, newPassword} = req.body;
    if(saltPassword.doesPasswordMatch(user.password, user.salt, oldPassword)){
      const saltedPassword = saltPassword.makePasswordEntry(newPassword);
      user.password = saltedPassword.hash;
      user.salt = saltedPassword.salt;
      user.save()
        .then(()=>{
          res.send("Password changed!")
        });
    }else{
      return res.status(422).send({error:'The old password is not correct'});
    }
  },

  //Edit user's avatar
  changeAvatar: function(req,res,next) {
    User.findById({_id: req.user._id})
      .then((user) => {
        user.avatar = req.file.path;
        user.save()
          .then(() =>{
            res.send("New avatar saved");
          })
      })
  },

  //change the user's following:
  changeFollowing: function(req,res,next) {
    const user = req.user;
    const following_id = req.body;
    User.findById({_id:user._id})
      .then(user => {
        User.findById({_id:following_id._id})
          .then(followingUser =>{
            const len = user.following.length;
            user.following = user.following.filter(item => item.toString() !== following_id._id.toString())
            followingUser.followers = followingUser.followers.filter(item => item.toString() !== user._id.toString())
            if(user.following.length === len){
              user.following.push(following_id._id);
              followingUser.followers.push(user._id);
              Promise.all([user.save(),followingUser.save()])
                .then(()=>{
                  res.send("saved");
                })
            }
          })

      })

    // User.findOneAndUpdate({_id:user._id}, {$pull: {following: ObjectId(following_id._id)}})
    //   .then((data) => {
    //       if(data.id=== user.id) {
    //         user.following.push(following_id);
    //         user.save()
    //           .then(()=>{
    //             User.findById(user._id)
    //               .then((user) =>{
    //                 res.send(user);
    //               });
    //           });
    //       }
    //     })
    //     .catch((err)=>{
    //       console.log(err);
    //     })
    //
    // User.findOneAndUpdate(following_id, {$pull: {followers: ObjectId(user._id)}})
    //       .then((data)=>{
    //         if(data._id ) {
    //           followinguser.follower.push(user._id);
    //           followinguser.save()
    //             .then(()=>{
    //               User.findById(following_id)
    //                 .then((followinguser) =>{
    //                   console.log(followinguser)
    //                 });
    //             })
    //         }
    //   })
  },



  //Find all the posts of the user
  findPosts: function(req,res,next) {
    User.findById({ _id: req.user._id})
    .populate('posts')
    .then(user => res.send(user.posts));
  },

  //Find most popular 5 users
  sugguestedFollower: function(req,res,next) {
    User.find({ _id: { $ne: req.user._id }})
      .sort({followersCount: -1})
      .limit(5)
      .then(users =>{
        res.send(users);
      })
  }

}
