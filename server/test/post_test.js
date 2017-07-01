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

    joe.posts.push(post);
    joe.followers.push(alex);
    post.comments.push(comment);
    comment.user = joe;
    alex.following.push(joe);

    Promise.all([joe.save(),post.save(),comment.save()])
      .then(()=>{
        done();
      });

  });

  xit('save a relation between a user and a blogpost', (done)=>{
    User.findOne({username : 'Joe'})
      .populate('posts')
      .then((user)=>{
        console.log(user);
        assert(user.posts[0].content === 'Yep it really is');
        done();
      })
  });

});
