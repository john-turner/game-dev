var socketio = require('socket.io')
	, heroes = require('./heroes.js')
	, player = require('./player.js');

var ioGame;
var gameID = 0;
var games = {};

exports.listen = function(io){
	ioGame = io.of('/game');

	ioGame.on('connection', function (socket) {
  		socket.emit('heroes', heroes.getHeroes());
  		assignGame(socket);
	});

	ioGame.on('heroes', function (socket) {	
  		socket.emit('heroes', heroes.getHeroes());
	});

}

var assignGame = function(socket){
	var openGame = findOpenGame(socket);
	openGame.addPlayer(socket);
}

var findOpenGame = function(socket){
	for (var game in games) {
	  if (games.hasOwnProperty(game)) {
	    if(games[game].isAwaitingPlayers()){
	    	return games[game];
	    }
	  }
	}
	var newGame = new Game();
	games[newGame.ID] = newGame;
	return newGame;
}

var GameState = Object.freeze({"CONNECTION_SCREEN":0,"HERO_DRAFT":1, "ITEM_DRAFT":2, "HERO_BUILD":3, "BATTLE":4});

var Game = function(){
	this.ID = gameID++;
	this.room = 'Game'+ this.IDs;
	this.players = {};
	this.gameState = GameState.CONNECTION_SCREEN;
	this.numberOfPlayers = 2;

	this.addPlayer = function(socket){
		if(this.players.length > this.numberOfPlayers){
			return false;
		}
		socket.join(this.room);
		var newPlayer = new player.Player(socket);
		this.players[newPlayer.ID] = newPlayer;
		console.log(newPlayer);
		socket.broadcast.to(this.room).emit('playerJoined', {
			gamePlayer: player
		});
		return true;
	};

	this.removePlayer = function(playerID){
		for(var i = 0; i < this.players.length; i++){
			if(this.players[i] === playerID){
				this.players.splice( i, 1 );
			}
		}
		socket.broadcast.to(this.room).emit('playerLeft', {
			player: player
		});
	}

	this.init = function(){

	};

	//Test if players are created and initialized.
	//Remain at Connection Screen until correct number of players have been intialized
	this.start = function(){

	};

	//Updates Game state
	this.update = function(){

	};

	this.isGameEmpty = function(){
		return this.players.length === 0;
	};

	this.isAwaitingPlayers = function(){
		return this.players.length < this.numberOfPlayers;
	};

}







