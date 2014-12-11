'use strict';

describe('testing playGameController',function(){
	
	beforeEach(module('tictactoeApp'));
	
	var PlayController, scope, location, httpBackend, http;

	beforeEach(inject(function ($injector, $controller, $rootScope, $http, $location, $interval) {
		scope = $rootScope.$new();
		http = $http;
		httpBackend = $injector.get('$httpBackend');
		location = $location;
		location.search('gId', '1337');
		location.search('playerRole', 'X');
		PlayController = $controller('PlayGameController', {
			$scope: scope
		});
	}));
	
	afterEach(function () {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it('should give proper values to scope variables: gameName, myself & joinLink', function(){

		init();

		expect(scope.myself.userName).toBe('Kiddi');
		expect(scope.joinLink).toBe('http://server:80/join/1337');
		expect(scope.gameState.gameName).toBe('TheBestGame');
	});

	function init(){
		 httpBackend.expectGET('/api/history/1337').respond([{
			event: "GameCreated",
			name: "TheBestGame",
			id: "1337",
			user: {
				userName: "Kiddi"
			}
			}, 
			{
			event: "GameJoined",
			name: "TheBestGame",
			id: "1337",
			user: {
				userName: "Ragnar"
			}
			}
		]);
		httpBackend.flush();
	}
});