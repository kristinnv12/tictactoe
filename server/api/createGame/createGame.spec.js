'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/createGame', function() {
	it('should respond with a GameCreated event in a Json array', function(done){
		var given = {
			id: "1",
			command: "CreateGame",
			user: {
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		};

		var myRequest = request(app);

		myRequest
			.post('/api/createGame')
			.type('json')
			.send(given)
			.end(function(error, response){
				if(error){
					return done(error);
				}
				response.body.should.be.instanceof(Array);
				done();
			});
	});
});