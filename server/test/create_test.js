const assert = require('assert');
const User = require('../schema/user');

describe('Creating records', () => {
  it('saves a user', (done) =>{
    const joe = new User({username : "Joe", password: '1234567', email: 'test@test.com'});

    joe.save()
      .then(() => {
        assert(!joe.isNew);
        done();
      });
  });
});
