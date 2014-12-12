'use strict';

angular.module('tictactoeApp')
	.factory('gameState', function(){
		return function(){

			var gameState = {
				exists: false,
				id: 'n/a',
				gameName: 'n/a',
				p1: undefined,
				p2: undefined,
				board: 
				[
					["", "", ""], 
					["", "", ""], 
					["", "", ""]
				],
				nextToMove: 'X',
				winner: undefined,
				draw: false,
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
						},
						'MoveMade': function(event, state){
							if(event.side === 'X')
							{
								state.nextToMove = 'O';
							}
							else
							{
								state.nextToMove = 'X'
							}
							state.board[event.coordinates[0]][event.coordinates[1]] = event.side;
						},'GameWon': function(event, state){
							state.board[event.coordinates[0]][event.coordinates[1]] = event.side;
							state.winner = event.user.userName;
							state.nextToMove = 'Done';
						},'GameDraw': function(event, state){
							state.board[event.coordinates[0]][event.coordinates[1]] = event.side;
							state.draw = true;
							state.nextToMove = 'Done';
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
