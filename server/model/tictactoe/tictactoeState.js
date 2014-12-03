var _ = require('lodash');
module.exports = function(events){

	var gameFull = false;
	var gameExcists = false;
	var p1;
	var p2;
	var playerMove;
	var board = [['_','_','_'],['_','_','_'],['_','_','_']];

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
				move(currEvent.coordinates);
			}
			else if(JSON.stringify(currEvent.user) === JSON.stringify(p2))
			{
				console.log("Player: " + JSON.stringify(p2) + " moved");
				playerMove = p1;
				move(currEvent.coordinates);
			}
			console.log("SWITCHING PAYERMOVE");
		}
		console.log("current playerMove: " + JSON.stringify(playerMove));
		drawBoard();
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
		},
		free: function(coor){
			
			var square = board[coor[0]][coor[1]];

			return (square === '_');
		},
		makeMove: function(coor){
			move(coor);
		}
	}

	function move(coor){
		if(JSON.stringify(playerMove) === JSON.stringify(p1))
		{
			board[(coor[0])][(coor[1])] = 'X';
		}
		else if(JSON.stringify(playerMove) === JSON.stringify(p2))
		{
			board[(coor[0])][(coor[1])] = 'O';
		}
	}
	function drawBoard(){
		var i;
		var x;
		var line = '';
		for(i = 0; i < 3; i++){
			for(x = 0; x < 3; x++){
				line += ' ' + board[i][x];
			}
			console.log(line);
			line = '';
		}
	}
};