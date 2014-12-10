module.exports = function(history){
	
	var tttState = require('./tictactoeState');
	var gameState = tttState(history);
 	return {
		executeCommand: function(command){
			var commandHandlers = {
				"CreateGame": function(command){
					if(!gameState.gameExcists()){
						return[{
							event:"GameCreated",
							user: command.user,
							name: command.name,
							timeStamp: command.timeStamp
						}];
					}
					else
					{
						return[{
							event:"GameExcists",
							user: command.user,
							name: command.name,
							timeStamp: command.timeStamp
						}];
					}
				},
				"JoinGame": function(command){
					//console.log("----->" + gameState.gameFull());
					if(gameState.gameFull())
					{
						return[{
							event:"JoinFailGameFull",
							user: command.user,
							name: command.name,
							timeStamp: command.timeStamp
						}];						
					}
					gameState.gameFull = true;
					return[{
						event:"GameJoined",
						user: command.user,
						name: command.name,
						timeStamp: command.timeStamp
					}];
				},
				"MakeMove": function(command){
					if(!gameState.gameExcists())
					{
						return[{
							event:"GameDoesntExcist",
							user: command.user,
							name: command.name,
							timeStamp: command.timeStamp
						}];	
					}
					if(!gameState.gameFull())
					{
						return[{
							event:"GameNotFull",
							user: command.user,
							name: command.name,
							timeStamp: command.timeStamp
						}];	
					}
					if((gameState.playerMove().userName) === (command.user.userName))
					{

						if(gameState.free(command.coordinates))
						{
							gameState.makeMove(command.coordinates);
							if(gameState.state() === "GameWon")
							{
								return[{
									event:"GameWon",
									user: command.user,
									name: command.name,
									timeStamp: command.timeStamp
								}];
							}
							else if(gameState.state() === "GameDraw")
							{
								return[{
									event:"GameDraw",
									user: command.user,
									name: command.name,
									timeStamp: command.timeStamp
								}];

							}

							return[{
								event:"MoveMade",
								user: command.user,
								name: command.name,
								timeStamp: command.timeStamp,
								coordinates: command.coordinates
							}];
						}
						else
						{
							return[{
								event:"SquareOccupied",
								user: command.user,
								name: command.name,
								timeStamp: command.timeStamp,
								coordinates: command.coordinates
							}];
						}
					}
					else
					{
						return[{
							event:"NotYourMove",
							user: command.user,
							name: command.name,
							timeStamp: command.timeStamp
						}];	
					}
				}
			}
			return commandHandlers[command.command](command);
		}
	}
};