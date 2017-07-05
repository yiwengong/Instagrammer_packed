const Comment = require('../schema/comment');
const Post = require('../schema/post');

module.exports = {

  create: function(req, res, next){
    const commentProps = {
      comment: req.body.comment,
      user_id: req.user._id,
      post_id: req.body.post_id
    }
    Comment.create(commentProps)
      .then(comment =>{
        Post.findById({_id:commentProps.post_id})
          .then((post) =>{
            post.comments.push(comment._id);
            post.save()
              .then(()=>{
                res.send(comment);
              })
          })
      })
      .catch(next);
  },

  findPostComments: function(req,res,next) {
    Post.findById({_id:req.query.id})
      .populate({
        path:'comments',
        model:'comment',
        populate:{
          path:'user_id',
          model:'user'
        }
      })
      .then((post)=>{
        res.send(post);
      });
  },

  delete: function(req,res, next){
    const commentId = req.params.commentId;

    Comment.findByIdAndRemove({_id: commentId})
      .then(comment => res.status(204).send(comment))
      .catch(next);
  }

}
