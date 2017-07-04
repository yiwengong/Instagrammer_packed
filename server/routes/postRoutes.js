const PostController = require('../controllers/post_controller.js');
const passportService = require('../services/passport');
const passport = require('passport');
const upload = require('../services/upload');


const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = (app) =>{
  // post-related api
  app.post('/posts/new',[requireAuth, upload.single('posts')], PostController.create);
  app.get('/posts/followingposts',requireAuth, PostController.fetchFollowingPosts);
  app.put('/post/:userId/:postId',requireAuth, PostController.update);
  app.delete('/post/:userId/:postId',requireAuth, PostController.delete);

}
