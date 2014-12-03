module.exports = function(history){
	
	var tttState = require('./tictactoeState');
	var gameState = tttState(history);
 	return {
		executeCommand: function(command){
			var commandHandlers = {
				"CreateGame": function(command){
					return[{
						event:"GameCreated",
						user: command.user,
						name: command.name,
						timeStamp: command.timeStamp
					}];
				},
				"JoinGame": function(command){
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
					//console.log(gameState.gameExcists());
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
				}
			}
			return commandHandlers[command.command](command);
		}
	}
};