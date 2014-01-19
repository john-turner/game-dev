exports.setSocket = function(socket){
	
};

var GameState = Object.freeze({"CONNECTION_SCREEN":0,"HERO_DRAFT":1, "ITEM_DRAFT":2, "HERO_BUILD":3, "BATTLE":4});


exports.Game = function(){
	this.room;
	this.players;
	this.gameState;
}



