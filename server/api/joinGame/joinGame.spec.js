'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('----------POST /api/joinGame--------------', function() {
	it('should respond with a GameJoined event in a Json array', function(done){
		var given = {
			id: "1",
			command: "JoinGame",
			user: {
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		};

		var myRequest = request(app);

		myRequest
			.post('/api/JoinGame')
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