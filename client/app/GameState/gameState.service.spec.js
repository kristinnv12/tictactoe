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
});