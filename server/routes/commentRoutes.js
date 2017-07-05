const CommentController = require('../controllers/comment_controller.js');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = function(app) {
  app.post('/comments/new', requireAuth, CommentController.create);
  // app.delete('/comment/:userId/:postId/:commentId', requireAuth, CommentController.delete);
  app.get('/comments',requireAuth, CommentController.findPostComments);
};
