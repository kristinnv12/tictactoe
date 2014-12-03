var _ = require('lodash');
module.exports = function(events){

	var gameFull = false;
	var gameExcists = false;
	var p1;
	var p2;
	var playerMove;

	_.each(events, function(currEvent){
		if(currEvent.event === "GameJoined")
		{
			console.log("Player: " + JSON.stringify(currEvent.user) + " joined the game");
			p2 = currEvent.user;
			gameFull = true;
		}
		if(currEvent.event === "GameCreated")
		{
			console.log("Player: " + JSON.stringify(currEvent.user) + " created the game");
			playerMove = currEvent.user;
			p1 = currEvent.user;
			gameExcists = true;
		}
		if(currEvent.event === "MoveMade")
		{
			if(JSON.stringify(currEvent.user) === JSON.stringify(p1))
			{
				console.log("Player: " + JSON.stringify(p1) + " moved");
				playerMove = p2;
			}
			else if(JSON.stringify(currEvent.user) === JSON.stringify(p2))
			{
				console.log("Player: " + JSON.stringify(p2) + " moved");
				playerMove = p1;
			}
			console.log("SWITCHING PAYERMOVE");
		}
		console.log("current playerMove: " + JSON.stringify(playerMove));
	});

	return {
		
		gameFull: function(){
			return gameFull;
		},
		gameExcists: function(){
			return gameExcists;
		},
		playerMove: function(){
			return playerMove;
		}
	}
};