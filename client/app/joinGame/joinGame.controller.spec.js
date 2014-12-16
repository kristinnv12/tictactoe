'use strict';

describe("testing joinGameController", function(){
	
	beforeEach(module('tictactoeApp'));

	var JoinGameController, scope, httpBackend, location;

	beforeEach(inject(function($controller, $location, $httpBackend, $rootScope, $state){
		httpBackend = $httpBackend;
		location = $location;
		$state.params.gameId = '1337';

		scope = $rootScope.$new();
		JoinGameController = $controller('JoinGameController',{
			$scope: scope
		});
	}));

	it("should add player to game and assign to O",function(){

		httpBackend.expectGET('/api/history/1337').respond([{
			event: "GameCreated",
			name:"theBestGame",
			id : "1337"
	    }]);

	    httpBackend.expectGET("app/createGame/CreateGame.html").respond('');

	    httpBackend.flush();

	    httpBackend.expectPOST('/api/joinGame/', {
			id: "1337",
			command: "JoinGame",
			user: {
			userName: "Kiddi",
			side: "O"
			},
			name: 'theBestGame',
			timeStamp: '2014-12-02-T18:23:55'
	    })
	    .respond([
	    	{event: "GameJoined"}
	    ]);

		scope.userName = "Kiddi";
		scope.gameState.p1 = "Ragnar";
	    scope.joinGame();


	    httpBackend.expectGET('app/playGame/playGame.html').respond('');
	    httpBackend.flush();


	    expect(location.search()['playerRole']).toBe('O');
	    expect(location.search()['gId']).toBe('1337');
	    expect(location.path()).toBe('/play');
		});
});