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

	it('should assign right user to playerRole O', function(){

		location.search('playerRole', 'O'),

		init();

		expect(scope.myself.userName).toBe('Ragnar');
	});

	it('should switch nextToMove when move is made', function(){

		init();
		httpBackend.expectPOST('/api/makeMove/', {
			id: "1337",
			command: "MakeMove",
			user: {
			userName: "Kiddi"
			},
			timeStamp: '2014-12-02-T18:23:55',
			coordinates: [1, 1],
			side: 'X'
		}).respond([{
			event: "MoveMade",
			user: {
			userName: "Kiddi"
			},
			timeStamp: '2014-12-02-T18:23:55',
			coordinates: [1, 1],
			side: 'X'
		}]);
	location.search('playerRole', 'X');

	scope.move([1, 1]);
	httpBackend.flush();

	expect(scope.myMove()).toBe(false);


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
		}]);
		httpBackend.flush();
	}
});