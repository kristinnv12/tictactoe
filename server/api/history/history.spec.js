'use strict';
	var should = require('should');
	var app = require('../../app');
	var request = require('supertest');

describe('GET /api/history', function() {

it('should respond with JSON array', function(done) {

	request(app)
	.get('/api/history/123')
	.expect(200)
	.expect('Content-Type', /json/)
	.end(function(error, response) {
		if (error) return done(error);
		response.body.should.be.instanceof(Array);
		done();
	});
});
});	