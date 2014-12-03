module.exports = function(history){
	
	//var tttState = require('./tictactoeState');
	//var gameState = tttState(history);
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
				}
			}
			return commandHandlers[command.command](command);
		}
	}
};