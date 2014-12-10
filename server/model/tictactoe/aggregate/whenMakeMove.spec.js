'use strict';
var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe');

describe('-------- Making a move --------', function(){

	it('should emit a GameDoesntExcist event', function(){
		
		var givenObject = [];

		var when = {
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			command: "MakeMove",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		};

		var then = [{
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			event:"GameDoesntExcist",
			user:{
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		}];

		var returnedEvents = tictactoe(givenObject).executeCommand(when);
		should(returnedEvents).eql(then);
	})

	it('should emit a GameNotFull event', function(){
		
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
			command: "MakeMove",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		};

		var then = [{
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			event:"GameNotFull",
			user:{
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		}];

		var returnedEvents = tictactoe(givenObject).executeCommand(when);
		should(returnedEvents).eql(then);
	})

	it('should emit a NotYourMove event', function(){
		
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
				userName: "Ragnar"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		}];

		var when = {
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			command: "MakeMove",
			user:{
				userName:"Ragnar"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates:[0,0]
		};

		var then = [{
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			event:"NotYourMove",
			user:{
				userName: "Ragnar"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		}];

		var returnedEvents = tictactoe(givenObject).executeCommand(when);
		should(returnedEvents).eql(then);
	})

	it('should emit a NotYourMove event', function(){
		
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
				userName: "Ragnar"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		},
		{
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			event: "MoveMade",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		}];

		var when = {
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			command: "MakeMove",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		};

		var then = [{
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			event:"NotYourMove",
			user:{
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		}];

		var returnedEvents = tictactoe(givenObject).executeCommand(when);
		should(returnedEvents).eql(then);
	})

	it('should emit a MoveMade event', function(){
		
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
				userName: "Ragnar"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		}];

		var when = {
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			command: "MakeMove",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		};

		var then = [{
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			event:"MoveMade",
			user:{
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		}];

		var returnedEvents = tictactoe(givenObject).executeCommand(when);
		should(returnedEvents).eql(then);
	})

	it('should emit a MoveMade event', function(){
		
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
				userName: "Ragnar"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		},
		{
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			event: "MoveMade",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		},
		{
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			event: "MoveMade",
			user:{
				userName:"Ragnar"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,1]
		}];

		var when = {
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			command: "MakeMove",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,2]
		};

		var then = [{
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			event:"MoveMade",
			user:{
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,2]
		}];

		var returnedEvents = tictactoe(givenObject).executeCommand(when);
		should(returnedEvents).eql(then);
	})

	it('should emit a SquareOccupied event', function(){
		
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
				userName: "Ragnar"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		},
		{
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			event: "MoveMade",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		}];

		var when = {
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			command: "MakeMove",
			user:{
				userName:"Ragnar"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		};

		var then = [{
			id: "7bc36500-5ac7-a3e2-f52b-0088373b3a9b",
			event:"SquareOccupied",
			user:{
				userName: "Ragnar"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		}];

		var returnedEvents = tictactoe(givenObject).executeCommand(when);
		should(returnedEvents).eql(then);
	})
});
