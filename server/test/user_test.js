const assert = require('assert');
const User = require('../schema/user');
const Comment = require('../schema/comment');
const Post = require('../schema/post');

describe('User Tests', ()=>{
  let joe, alex, post, comment;

  beforeEach((done)=>{
    joe = new User({username : 'Joe', password: '1234567', email: 'joe@test.com'});
    alex = new User({username: 'Alex', password: '987654321', email: 'alex@test.com'});
    post = new Post({content: 'Yep it really is'});
    comment = new Comment({content: 'Congrats on great post'});

    joe.followers.push(alex);
    post.user_id = joe;
    comment.user_id = joe;
    comment.post_id = post;
    alex.following.push(joe);

    Promise.all([joe.save(),post.save(),comment.save()])
      .then(()=>{
        done();
      });

  });

  it('save a relation between a user and a blogpost', (done)=>{
    Post.findOne({content: 'Yep it really is'})
      .then(post => {
        User.findOne({username: 'Joe'})
          .then(user =>{
            assert(String(user._id) === String(post.user_id));
            done();
          })
      })
  });

  xit('save a full relation graph', (done) =>{
    User.findOne({username : 'Joe'})
      .populate({
        path:'posts',
        model:'post',
        populate:{
          path: 'comments',
          model:'comment',
          populate: {
            path:'user',
            model:'user'
          }
        }
      })
      .then((user)=>{
        assert(user.username === 'Joe');
        assert(user.posts[0].content === 'Yep it really is');
        assert(user.posts[0].comments[0].content === 'Congrats on great post');
        assert(user.posts[0].comments[0].user.username === 'Joe');
        done();
      })

  });

});
