const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');

const User = mongoose.model('user');

//Post – create a user
describe('Post - sign up a user', ()=> {
	it('Post to /users/signup to create new user', (done) => {
		User.count().then(count => {
      		request(app)
        		.post('/users/signup')
        		.send({username : 'Joe', password: '1234567', email: 'test@test.com'})
        		.end(() => {
          			User.count().then(newCount => {
            			assert(count + 1 === newCount);
									User.findOne({username:'Joe'})
										.then((user) => {
											assert(user.email === 'test@test.com');
											done();
										})
          			});
        		});
    	});
	});

	it('Post to /users/signup to requires an email', (done) => {
		User.count().then(count => {
      		request(app)
        		.post('/users/signup')
        		.send({username : 'Joe', password: '1234567'})
        		.end((err, res) => {
          			assert(res.body.error);
          			done();
        		});
    	});
	});

	it('Post to /users/signup to requires a username', (done) => {
		User.count().then(count => {
      		request(app)
        		.post('/users/signup')
        		.send({password: '1234567', email:'test@test.com'})
        		.end((err, res) => {
          			assert(res.body.error);
          			done();
        		});
    	});
	});

	it('Post to /users/signup to requires a password', (done) => {
		User.count().then(count => {
      		request(app)
        		.post('/users/signup')
        		.send({username : "Joe", email:'test@test.com'})
        		.end((err, res) => {
          			assert(res.body.error);
          			done();
        		});
    	});
	});
});
