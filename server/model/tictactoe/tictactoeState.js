var _ = require('lodash');
module.exports = function(events){

	var gameFull = false;
	var gameExcists = false;

	_.each(events, function(currEvent){
		gameFull = (currEvent.event === "GameJoined")
		gameExcists = (currEvent.event === "GameCreated")
	});

	return {
		gameFull: function(){
			return gameFull;
		}
	}
	return {
		gameExcists: function(){
			return gameExcists;
		}
	}
};