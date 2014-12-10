'use strict';

angular.module('tictactoeApp')
	.config(function($stateProvider){
		$stateProvider
			.state('create', {
				url: '/',
				templateUrl: 'app/createGame/CreateGame.html',
				controller: 'CreateGameController'
			});
	});