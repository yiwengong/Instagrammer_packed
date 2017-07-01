const PostController = require('../controllers/post_controller.js');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = (app) =>{
  // post-related api
  app.post('/post/:userId/new',requireAuth, PostController.create);
  app.put('/post/:userId/:postId',requireAuth, PostController.update);
  app.delete('/post/:userId/:postId',requireAuth, PostController.delete);

}
