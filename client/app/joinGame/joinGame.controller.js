'use strict';

angular.module('tictactoeApp')
	.controller('JoinGameController', function($scope, $http, $location, $state, gameState){
		
		
		var handleEvents = function(promise){

			promise.then(function(res){
				$scope.gameState.alter(res.data);
				console.log(JSON.stringify(res.data));
			});
		};

		$scope.gameState = gameState();
		var gameId = $location.search()['gameId'];
		console.log(JSON.stringify($state.params.gameId));

		handleEvents($http.get('/api/history/' + $state.params.gameId));

		$scope.joinGame = function(){
			var postPromise = $http.post('/api/joinGame/',{
				'id': $scope.gameState.id,
				'command': 'JoinGame',
				'user':{
					'userName': $scope.userName,
					'side': 'O'
				},
				'timeStamp': '2014-12-02-T18:23:55'
			});
			handleEvents(postPromise);

			postPromise.then(function(res){
				//console.log(JSON.stringify(res.data[0]));
				$location.url('/play');
				$location.search('gId', $scope.gameState.id);
				$location.search('playerRole', 'O');
			});
		};

});