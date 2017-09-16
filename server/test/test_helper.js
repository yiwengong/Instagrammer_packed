const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/Instagrammer_test');
  mongoose.connection
    .once('open',()=> { done(); })
    .on('error', ()=> {
      console.log('Warning', error);
    });

});

beforeEach((done) => {
  const {users, comments, posts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      posts.drop(() => {
        done();
      });
    });
  });
});
