var _ = require('lodash');
module.exports = function(events){

	var gameFull = false;
	_.each(events, function(currEvent){
		gameFull = (currEvent.event === "GameJoined")
	});

	return {
		gameFull: function(){
			return gameFull;
		}
	}
};