const Comment = require('../schema/comment');

module.exports = {

  create: function(req, res, next){

    const commentProps = {
      comment: req.body.comment,
      user_id: req.user._id,
      post_id: req.body.post_id
    }

    console.log(commentProps);

    Comment.create(commentProps)
      .then(comment =>res.send(comment))
      .catch(next);
  },

  delete: function(req,res, next){
    const commentId = req.params.commentId;

    Comment.findByIdAndRemove({_id: commentId})
      .then(comment => res.status(204).send(comment))
      .catch(next);
  }

}
