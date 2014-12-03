'use strict';
var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe');

describe('making a move', function(){

	it('should emit a GameDoesntExcist event', function(){
		
		var givenObject = [];

		var when = {
			command: "MakeMove",
			user:{
				userName:"Kiddi"
			},
			name:"MyGame",
			timeStamp: "2014-12-02-T18:23:55"
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
		should(JSON.stringify(returnedEvents)).be.exactly(JSON.stringify(then));
	})
});
