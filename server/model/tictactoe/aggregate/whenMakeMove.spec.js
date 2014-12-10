'use strict';
var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe');

describe('-------- Making a move --------', function(){

	it('should emit a GameDoesntExcist event', function(){
		
		var givenObject = [];

		var when = {
			command: "MakeMove",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		};

		var then = [{
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
			event:"GameCreated",
			user:{
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		}];

		var when = {
			command: "MakeMove",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		};

		var then = [{
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
			event:"GameCreated",
			user:{
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		},
		{
			event:"GameJoined",
			user:{
				userName: "Ragnar"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		}];

		var when = {
			command: "MakeMove",
			user:{
				userName:"Ragnar"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates:[0,0]
		};

		var then = [{
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
			event:"GameCreated",
			user:{
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		},
		{
			event:"GameJoined",
			user:{
				userName: "Ragnar"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		},
		{
			event: "MoveMade",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		}];

		var when = {
			command: "MakeMove",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		};

		var then = [{
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
			event:"GameCreated",
			user:{
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		},
		{
			event:"GameJoined",
			user:{
				userName: "Ragnar"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		}];

		var when = {
			command: "MakeMove",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		};

		var then = [{
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
			event:"GameCreated",
			user:{
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		},
		{
			event:"GameJoined",
			user:{
				userName: "Ragnar"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		},
		{
			event: "MoveMade",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		},
		{
			event: "MoveMade",
			user:{
				userName:"Ragnar"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,1]
		}];

		var when = {
			command: "MakeMove",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,2]
		};

		var then = [{
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
			event:"GameCreated",
			user:{
				userName: "Kiddi"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		},
		{
			event:"GameJoined",
			user:{
				userName: "Ragnar"
			},
			name: "MyGame",
			timeStamp: "2014-12-02-T18:23:55"
		},
		{
			event: "MoveMade",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		}];

		var when = {
			command: "MakeMove",
			user:{
				userName:"Ragnar"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0]
		};

		var then = [{
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