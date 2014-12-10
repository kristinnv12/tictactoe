'use strict';
var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe');

describe('-------- Joining a game command --------', function(){

	it('should emit a gameJoined event', function(){
			
		var givenObject = [{
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			event:"GameCreated",
			user:{
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		}];
		var when = {
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			command: "JoinGame",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		};

		var then = [{
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			event:"GameJoined",
			user:{
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		}];

		var returnedEvents = tictactoe(givenObject).executeCommand(when);
		should(returnedEvents).eql(then);
	});

	it('should emit a gameFull event', function(){
			
		var givenObject = [{
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			event:"GameCreated",
			user:{
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		},
		{
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			event:"GameJoined",
			user:{
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		}];
		var when = {
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			command: "JoinGame",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		};

		var then = [{
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			event:"JoinFailGameFull",
			user:{
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		}];

		var returnedEvents = tictactoe(givenObject).executeCommand(when);
		should(returnedEvents).eql(then);
	});
});