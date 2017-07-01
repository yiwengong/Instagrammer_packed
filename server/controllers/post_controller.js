const Post = require('../schema/post');

module.exports = {

  create: function(req, res, next){

    const postProps = {
      image: req.body.image,
      content: req.body.content,
      likes: req.body.likes,
      user_id: req.params.userId
    }

    Post.create(postProps)
      .then(post =>res.send(post))
      .catch(next);
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
