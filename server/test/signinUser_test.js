const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');

const User = mongoose.model('user');

describe('Post - sign in a user', ()=> {
  beforeEach((done)=>{
    //signup for a user
		request(app)
			.post('/users/signup')
			.send({username : 'Alex', password: '1234567', email: 'alex@test.com'})
			.end((err, res) => {
					done();
			});

  })

	it('Post to /users/signin to sign in a user', (done) => {
    request(app)
      .post('/users/signin')
			.send({email:'alex@test.com',password: '1234567'})
			.expect(200,done);
	});

	it('Post to /users/signin to sign in a user with wrong password', (done) => {
		request(app)
      .post('/users/signin')
			.send({email:'alex@test.com',password: '14567'})
			.expect(401,done);
	});
});
