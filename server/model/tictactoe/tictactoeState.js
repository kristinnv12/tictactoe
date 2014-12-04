var _ = require('lodash');
module.exports = function(events){

	var gameFull = false;
	var gameExcists = false;
	var p1;
	var p2;
	var playerMove;
	var board = [["-","-","-"],["-","-","-"],["-","-","-"]];
	var state = "OnGoing"
	var turns = 0;

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
			move(currEvent.coordinates);
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
		},
		free: function(coor){
			
			var square = board[coor[0]][coor[1]];

			return (square === '-');
		},
		makeMove: function(coor){
			move(coor);
		},
		state: function(){
			return state;
		}
	}

	function move(coor){

		var lines = [];
		var i;
		
		if(JSON.stringify(playerMove) === JSON.stringify(p1))
		{
			console.log(JSON.stringify(playerMove) + " moved to: [" + coor[0] + "][" + coor[1] + "]")
			board[(coor[0])][(coor[1])] = 'X';
		}
		else if(JSON.stringify(playerMove) === JSON.stringify(p2))
		{
			console.log(JSON.stringify(playerMove) + " moved to: [" + coor[0] + "][" + coor[1] + "]")
			board[(coor[0])][(coor[1])] = 'O';
		}
		drawBoard();

		turns++;	

		if(turns >= 9)
		{
			state="GameDraw";
		}

		for(i = 0; i < 8; i++)
		{
			lines[i] = "";
		}

		//Diagonal
		lines[0] = board[0][0] + board[1][1] + board[2][2];
		lines[1] = board[2][0] + board[1][1] + board[0][2];
		//Horizontal
		lines[2] = board[0][0] + board[1][0] + board[2][0];
		lines[3] = board[0][1] + board[1][1] + board[2][1];
		lines[4] = board[0][2] + board[1][2] + board[2][2];
		//Verstical
		lines[5] = board[0][0] + board[0][1] + board[0][2];
		lines[6] = board[1][0] + board[1][1] + board[1][2];
		lines[7] = board[2][0] + board[2][1] + board[2][2];

		//Check for win
		for(i = 0; i < 8; i++)
		{
			//console.log(lines[i]);
			if(lines[i] === "OOO" || lines[i] === "XXX")
			{
					state = "GameWon";
					console.log(JSON.stringify(playerMove) + ": WON THE GAME!!!");
					break;
			}
		}
		if(state === "OnGoing")
		{
			switchPlayers(JSON.stringify(playerMove));
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

	function switchPlayers(curruser){

		if(curruser === JSON.stringify(p1))
		{
			playerMove = p2;
		}
		else if(curruser === JSON.stringify(p2))
		{
			playerMove = p1;
		}
		console.log("SWITCHING PAYERMOVE");
	}
};