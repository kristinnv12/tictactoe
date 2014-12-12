'use strict';

describe('GameState testing', function(){
	var gameState;

	beforeEach(module('tictactoeApp'));

	beforeEach(inject(function(_gameState_){
		gameState = _gameState_();
	}));

	it('should add id, username, and gamename to state', function() {
		gameState.alter([{
			id: '1337',
			event: 'GameCreated',
			user:{
				username: 'Kiddi'
			},
			name: 'TheBestGame',
			timeStamp: '2014-12-02-T18:23:55'
		}]);

		expect(gameState.exists).toBe(true);
		expect(gameState.id).toBe("1337");
		expect(gameState.p1.username).toBe("Kiddi");
		expect(gameState.gameName).toBe("TheBestGame");
	});

	it('should add username to state', function() {
		gameState.alter([{
			id: '1337',
			event: 'GameCreated',
			user:{
				username: 'Ragnar'
			},
			name: 'TheBestGame',
			timeStamp: '2014-12-02-T18:23:55'
		}]);

		expect(gameState.p1.username).toBe("Ragnar");
		expect(gameState.nextToMove).toBe('X');
	});

	it('Should add player to state when gameJoined', function () {
		gameState.alter([{
			event: "GameJoined",
			user: {
				userName: "Kiddi"
			},
			name: "TheBestGame",
			timeStamp: "2014-12-02-T18:23:55"
		}]);

		expect(gameState.p2.userName).toBe("Kiddi");
	});

	it('Should add moves to state when MakeMove', function () {
		gameState.alter([{
			event: "MoveMade",
			user: {
				userName: "Kiddi"
			},
			name: "TheBestGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0],
			side: 'X'
		}]);

		expect(gameState.board[0][0]).toBe("X");
		expect(gameState.nextToMove).toBe('O');
	});

	it('Should win a game when GameWon', function () {
		gameState.alter([{
			event: "GameWon",
			user: {
				userName: "Kiddi"
			},
			name: "TheBestGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0],
			side: 'X'
		}]);

 		expect(gameState.nextToMove).toBe('Done');
		expect(gameState.winner).toBe("Kiddi");
	});

	it('Should draw a game when GameDraw', function () {
		gameState.alter([{
			event: "GameDraw",
			user: {
				userName: "Kiddi"
			},
			name: "TheBestGame",
			timeStamp: "2014-12-02-T18:23:55",
			coordinates: [0,0],
			side: 'X'
		}]);

 		expect(gameState.nextToMove).toBe('Done');
		expect(gameState.draw).toBe(true);
	});

});