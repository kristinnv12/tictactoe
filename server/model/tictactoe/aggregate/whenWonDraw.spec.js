'use strict';
var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe');

describe('-------- Wining/Drawing a game --------', function(){

	it('should emit a GameWon event', function(){
		
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
		},
		{
			event: "MoveMade",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [1,0]
		},
		{
			event: "MoveMade",
			user:{
				userName:"Ragnar"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [1,1]
		}];

		var when = {
			command: "MakeMove",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [2,0]
		};

		var then = [{
			event:"GameWon",
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

	it('should emit a GameWon event', function(){
		
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
		},
		{
			event: "MoveMade",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [1,1]
		},
		{
			event: "MoveMade",
			user:{
				userName:"Ragnar"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [2,1]
		}];

		var when = {
			command: "MakeMove",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [2,2]
		};

		var then = [{
			event:"GameWon",
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

	it('should emit a GameDraw event', function(){
		
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
		},
		{
			event: "MoveMade",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [1,0]
		},
		{
			event: "MoveMade",
			user:{
				userName:"Ragnar"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [1,1]
		},
		{
			event: "MoveMade",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [2,1]
		},
		{
			event: "MoveMade",
			user:{
				userName:"Ragnar"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [2,0]
		},
		{
			event: "MoveMade",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,2]
		},
		{
			event: "MoveMade",
			user:{
				userName:"Ragnar"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [1,2]
		}];

		var when = {
			command: "MakeMove",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [2,2]
		};

		var then = [{
			event:"GameDraw",
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