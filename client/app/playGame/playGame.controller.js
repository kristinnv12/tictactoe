'use strict';

angular.module('tictactoeApp')
	.controller('PlayGameController', function($scope, gameState, $location, $http){

	$scope.gameState = gameState();
	console.log($scope.gameState);
	var gameId = $location.search().gId;

	var handleEvents = function(promise){

		console.log('-----' + promise);

		promise.then(function(res){
			$scope.gameState.alter(res.data);
		});

		console.log($scope.gameState);
		
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
	handleEvents($http.get('/api/history/' + gameId));
});