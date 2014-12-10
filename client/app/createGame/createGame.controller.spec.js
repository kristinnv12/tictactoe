'use strict';

describe('Testing CreateGameController', function (){

	beforeEach(module('tictactoeApp'));

	var CreateGameController, location, scope, httpBackend;

	beforeEach(function(){
		module(function($provide){
			$provide.value('idgen', function(){
				return '1337';
			});
		});
	});

	beforeEach(inject(function($controller, $rootScope, $httpBackend, $location){
		httpBackend = $httpBackend;
		scope = $rootScope.$new();
		location = $location;
		CreateGameController = $controller('CreateGameController',{
			$scope: scope
		});
	}));

	it('Should respond with a GameCreated event response, assign player to x, have the right gameid, and use the username and name from the scope', function(){
		httpBackend.expectPOST('/api/createGame/', {
			id: '1337',
			command: 'CreateGame',
			user:{
				userName: 'Kiddi',
				side:'X'
			},
			name: 'TheBestGame',
			timeStamp: '2014-12-02-T18:23:55'
		}).respond([
			{
				id: '1337',
				event: 'GameCreated',
				user:{
					userName: 'Kiddi',
					side:'X'
				}
			}
		]);

		//Lets create a new game with your info
		scope.name = 'TheBestGame';
		scope.userName = 'Kiddi';
		scope.createGame();
		httpBackend.flush();

		expect(location.search().gId).toBe('1337');
		expect(location.search().playerRole).toBe('X');
		expect(location.path()).toBe('/play');
	});
});