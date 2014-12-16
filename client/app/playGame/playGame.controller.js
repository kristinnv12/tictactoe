'use strict';

angular.module('tictactoeApp')
	.controller('PlayGameController', function($scope, gameState, $location, $http, $interval){

	$scope.gameState = gameState();
	var gameId = $location.search().gId;

	var handleEvents = function(promise){


		promise.then(function(res){
			$scope.gameState.alter(res.data);
			console.log(JSON.stringify(res.data));
		});

		
		promise.then(function(){
			if($location.search().playerRole == 'X')
			{
				$scope.myself = $scope.gameState.p1;
				$scope.opponent = $scope.gameState.p2;
			}
			else
			{
				$scope.opponent = $scope.gameState.p1;
				$scope.myself = $scope.gameState.p2;
			}
			var port = '';

			if($location.port())
			{
				port = ':' + $location.port();
			}

			$scope.joinLink = 'http://' + $location.host() + port + '/join/' + $location.search().gId;
		})
	};

	$scope.move = function(coor)
	{

		if(!($scope.myMove))
		{
			console.log("wrong turn");
			return;
		}
		handleEvents($http.post('/api/makeMove/', {
			id: $scope.gameState.id,
			command: "MakeMove",
			user: $scope.myself,
			timeStamp: "2014-12-02-T18:23:55",
			name: $scope.gameState.gameName,
			coordinates: coor,
			side: currRole()
		}));
	};
	$scope.myMove = function()
	{
		return currRole() === $scope.gameState.nextToMove;
	}
	function currRole(){
		return $location.search()['playerRole'];
	}


	function update() {
		handleEvents($http.get('/api/history/' + gameId));
	}
	update();
	$interval(update, 2000);
});