'use strict';

angular.module('tictactoeApp')
	.factory('gameState', function(){
		return function(){

			var gameState = {
				exists: false,
				id: 'n/a',
				gameName: 'n/a',
				p1: 'n/a',
				p2: 'n/a',
				alter: function(history){
					var handlers = {
						'GameCreated': function(event, state){
							state.exists = true;
							state.gameName = event.name;
							state.p1 = event.user;
							state.id = event.id;
						},
						'GameJoined': function(event, state){
							state.p2 = event.user;
						}
					};
					 _.each(history, function (e) {
						handlers[e.event] && handlers[e.event](e, gameState);
					});
				}
			};
			return gameState;
		};
	});
