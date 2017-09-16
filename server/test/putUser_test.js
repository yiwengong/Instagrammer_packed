const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');

const User = mongoose.model('user');

describe('Put - update a user information', ()=> {
	it('put to /users/post add a new post to a user', (done) => {
    request(app)
      .post('/users/signup')
      .send({password: '1234567', email:'test@test.com'})
      .end((err, res) => {
          assert(res.body.error);
          done();
      });
	});
});
