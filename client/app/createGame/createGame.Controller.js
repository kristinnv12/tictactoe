'use strict';

angular.module('tictactoeApp')
	.controller('CreateGameController', function($scope, $http, $location, idgen){
		$scope.createGame = function(){

			var id = idgen();

			var postPromise = $http.post('/api/createGame/',{
				'id': id,
				'command': 'CreateGame',
				'user':{
					'userName': $scope.userName,
					'side': 'X'
				},
				'name': $scope.name,
				'timeStamp': '2014-12-02-T18:23:55'
			});
			postPromise.then(function(res){
				console.log(JSON.stringify(res.data[0]));
				$location.url('/play');
				$location.search('gId', res.data[0].id);
				$location.search('playerRole', 'X');
			});
		};
	});