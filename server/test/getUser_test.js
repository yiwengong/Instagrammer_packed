const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');

const User = mongoose.model('user');

describe('Get - search a user', ()=> {
  let token;

  beforeEach((done)=>{
    request(app)
      .post('/users/signup')
      .send({username: 'Alex', email:'alex@test.com',password: '1234567'})
      .end((err, res) => {
        token = res.body.token;
        console.log(token);
        done();
      });

  })

	it('Get to /searchuser to search a user by exited username', (done) => {

    request(app)
      .get('/searchuser?data=Alex')
      .set('authorization', token)
			.end((err, res) => {
        assert(res.body.length === 1);
        done();
      })
	});

	it('Post to /searchuser to search a user by inexistent username', (done) => {
    request(app)
      .get('/searchuser?data=aaaaa')
      .set('authorization', token)
			.end((err, res) => {
        assert(res.body.length === 0);
        done();
      })
	});
});
