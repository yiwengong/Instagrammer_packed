const Post = require('../schema/post');
const User = require('../schema/user');

module.exports = {

  create: function(req, res, next){
    const postProps = {
      image: req.file.path,
      content: req.body.content,
      likes: 0,
      user_id: req.user._id,
      timeField:new Date().getTime()
    }

    Post.create(postProps)
      .then(post => {
        User.findById({_id:req.user._id})
          .then(user =>{
            user.posts.push(post);
            user.save()
              .then(() =>{
                res.send(post);
              })
          })
        })
      .catch(next);

  },

  fetchFollowingPosts: function(req,res,next) {
    const {user} = req;
    const userId = user.following;
    userId.push(user._id);
    Post.find({user_id: {$in: userId}})
      .populate('user_id')
      .sort({timeField:-1})
      .limit(10)
      .then(posts=>{
        res.send(posts);
      })
  },

  changeLike: function(req,res,next) {
    const postId = req.body._id;
    const checked = req.body.checked;

    Post.findById({_id: postId})
      .then((post) =>{
        if(checked) {
          post.likes ++;
        }else{
          post.likes --;
        }
        post.save()
          .then(()=>{
            res.send('Add like');
          })
      })
  },

  update: function(req,res, next){
    const postProps = req.body;
    const postId = req.params.postId;

    Post.findByIdAndUpdate({_id: postId}, postProps)
      .then(()=> Post.findById({_id: postId}))
      .then(post => res.send(post))
      .catch(next);

  },

  delete: function(req,res, next){
    const postId = req.params.postId;

    Post.findByIdAndRemove({_id: postId})
      .then(post => res.status(204).send(post))
      .catch(next);
  }



}
