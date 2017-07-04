const Authentication = require('../controllers/authentication');
const UserController = require('../controllers/user_controller.js');
const passportService = require('../services/passport');
const passport = require('passport');
const upload = require('../services/upload');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app) {
  app.get('/', requireAuth, function(req,res) {
    res.send({hi: 'there'})
  });
  app.post('/users/signin',requireSignin, Authentication.signin);
  app.post('/users/signup', Authentication.signup);
  app.get('/users/posts', requireAuth, UserController.findPosts);
  app.put('/users/password', requireAuth, UserController.changePassword);
  app.put('/users/avatar', [requireAuth, upload.single('avatar')], UserController.changeAvatar);
  app.put('/users/following', requireAuth, UserController.changeFollowing);
  app.get('/users/:username', requireAuth, UserController.find);
  app.get('/users', requireAuth, UserController.sugguestedFollower);
  app.get('/user', requireAuth, UserController.findUserInfo);

};
