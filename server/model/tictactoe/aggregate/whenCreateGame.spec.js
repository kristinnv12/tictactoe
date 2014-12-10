'use strict';
var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe');

describe('-------- Creating a game command --------', function(){

	it('should emit a GameCreated event', function(){
		
		var givenObject = [];

		var when = {
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			command: "CreateGame",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		};

		var then = [{
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			event:"GameCreated",
			user:{
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		}];

		var returnedEvents = tictactoe(givenObject).executeCommand(when);
		should(returnedEvents.length).be.exactly(1);
		should(returnedEvents).eql(then);
	})
});
