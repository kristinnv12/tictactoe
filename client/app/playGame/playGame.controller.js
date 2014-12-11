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
				$scope.myself = $scope.gameState.p1.userName;
				$scope.opponent = $scope.gameState.p2.userName;
			}
			else
			{
				$scope.opponent = $scope.gameState.p1.userName;
				$scope.myself = $scope.gameState.p2.userName;
			}
			var port = '';

			if($location.port())
			{
				port = ':' + $location.port();
			}

			$scope.joinLink = 'http://' + $location.host() + port + '/join/' + $location.search().gId;
		})
	};


	function update() {
		handleEvents($http.get('/api/history/' + gameId));
	}
	update();
	$interval(update, 5000);
});