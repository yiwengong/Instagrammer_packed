const User = require('../schema/user');

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
    console.log(oldPassword);
    user.comparePassword(oldPassword,function(err, isMatch){
      if(err) {return next(err)}
      if(!isMatch) {
        return res.status(422).send({error:'THe old password is not correct'});
      }
      if(isMatch) {
        user.password = newPassword;
        user.save(function(err){
          return next(err);
        });
        return res.send("password changed!");
      }
    });
  }

}
