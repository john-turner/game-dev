var playerID = 0;
exports.Player = function(socket, name){
	this.ID = playerID;
	this.name = name || ('player' + playerID);
}