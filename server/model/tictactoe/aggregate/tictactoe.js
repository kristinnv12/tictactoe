module.exports = function(history){
	
	var tttState = require('./tictactoeState');
	var gameState = tttState(history);
 	return {
		executeCommand: function(command){
			var commandHandlers = {
				"CreateGame": function(command){
					return[{
						id: command.id,
						event:"GameCreated",
						user: command.user,
						name: command.name,
						timeStamp: command.timeStamp
					}];
				},
				"JoinGame": function(command){
					//console.log("----->" + gameState.gameFull());
					if(gameState.gameFull())
					{
						return[{
							id: command.id,
							event:"JoinFailGameFull",
							user: command.user,
							name: command.name,
							timeStamp: command.timeStamp
						}];						
					}
					return[{
						id: command.id,
						event:"GameJoined",
						user: command.user,
						name: command.name,
						timeStamp: command.timeStamp
					}];
				},
				"MakeMove": function(command){
					if(!gameState.gameExists())
					{
						return[{
							id: command.id,
							event:"GameDoesntExist",
							user: command.user,
							name: command.name,
							timeStamp: command.timeStamp
						}];	
					}
					if(!gameState.gameFull())
					{
						return[{
							id: command.id,
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
							console.log("--------------------------------->",gameState.state());
							gameState.makeMove(command.coordinates);
							console.log("--------------------------------->",gameState.state());
							if(gameState.state() === "GameWon")
							{
								return[{
									id: command.id,
									event:"GameWon",
									user: command.user,
									name: command.name,
									timeStamp: command.timeStamp,
									coordinates: command.coordinates,
									side: command.side
								}];
							}
							else if(gameState.state() === "GameDraw")
							{
								return[{
									id: command.id,
									event:"GameDraw",
									user: command.user,
									name: command.name,
									timeStamp: command.timeStamp,
									coordinates: command.coordinates,
									side: command.side
								}];

							}

							return[{
								id: command.id,
								event:"MoveMade",
								user: command.user,
								name: command.name,
								timeStamp: command.timeStamp,
								coordinates: command.coordinates,
								side: command.side
							}];
						}
						else
						{
							return[{
								id: command.id,
								event:"SquareOccupied",
								user: command.user,
								name: command.name,
								timeStamp: command.timeStamp,
								coordinates: command.coordinates
							}]
						}
					}
					else
					{
						return[{
							id: command.id,
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