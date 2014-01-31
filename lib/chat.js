var socketio = require('socket.io');
var ioChat;
var playerNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};
var chatRooms = {};


exports.listen = function(ioServer){
	io = ioServer;
	ioChat = ioServer.of('/chat');

	ioChat.on('connection', function(socket){
		playerNumber = assignGuestName(socket, playerNumber, nickNames, namesUsed);
		joinRoom(socket, 'Lobby');
		handleMessageBroadcasting(socket, nickNames);
		handleNameChangeAttempts(socket, nickNames, namesUsed);
		handleRoomJoining(socket);

		socket.on('rooms', function() {
			var chatRooms = {};
			for (var property in ioChat.manager.rooms) {
			        var chatRoomName = property.replace('/chat', '');
			        if(chatRoomName.length > 0){
			        	chatRooms[chatRoomName] = ioChat.manager.rooms[property];
			        }
			}
			socket.emit('rooms', chatRooms);
		});

		socket.on('usersInRoom', function() {
			var usersInRoom = ioChat.clients();
			var listUsersInRoom = [];
			if(usersInRoom.length > 1){
			for( var user in usersInRoom){
				var userSocketId = usersInRoom[user].id;
				if(userSocketId != socket.id) {
					listUsersInRoom.push(nickNames[userSocketId]);
				}
				}
			}
			socket.emit('usersInRoom', listUsersInRoom);
		});

		handleClientDisconnect(socket, nickNames, namesUsed);
	})
}

var assignGuestName = function(socket, playerNumber, nickNames, namesUsed) {
	var name = 'Player' + playerNumber;
	nickNames[socket.id] = name;
	socket.emit('nameResult', {
		success : true,
		name : name
	});
	console.log('name ' + name);
	namesUsed.push(name);
	return playerNumber + 1;
}


function joinRoom(socket, room) {
	socket.join(room); //?
	currentRoom[socket.id] = room;
	socket.emit('joinResult', {room : room})
	socket.broadcast.to(room).emit('message', {
		text: nickNames[socket.id] + ' joined '
	});

	var usersInRoom = ioChat.clients(room);
	console.log("list users " + usersInRoom);

	if(usersInRoom.length > 1){
		var listUsersInRoom = "Users in this room : ";
		for( var user in usersInRoom){
			var userSocketId = usersInRoom[user].id;
			if(userSocketId != socket.id) {
				if(user > 0){
					listUsersInRoom += ', ';
				}
			listUsersInRoom += nickNames[userSocketId];
			}
		}
		console.log("list users " + listUsersInRoom);
		socket.emit('message', {text: listUsersInRoom});
	}
}

function handleNameChangeAttempts(socket, nickNames, names) {
	socket.on('nameAttempt', function(name) {
		if(name.indexOf('Player') == 0){
			socket.emit('nameResult', {
				success : false,
				message: 'Don\'t name yourself Player....'
			});
		} else {
			if(namesUsed.index(name) == -1) {
				var oldName = nickNames[socket.id];
				var previousNameIndex = namesUsed.indexOf(previousNameIndex);
				namesUsed.push(name);
				nickNames[socket.id] = name;
				delete namesUsed[previousNameIndex]; //?

				socket.emit('nameResult', {
					success : true,
					name: name
				});

				socket.broadcast.to(currentRoom[socket.id]).emit('message', {
					text: previousName + ' is now ' + name + '.'
				});
			} else {
				socket.emit('nameResult', {
					success: false,
					message: 'That name is taken!'
				})
			}
		} 
	});
}

var handleMessageBroadcasting = function(socket) {
	socket.on('message', function(message){
		socket.broadcast.to(message.room).emit('message', {
			text: nickNames[socket.id] + ':' + message.text
		});
	});
}

var handleRoomJoining =  function(socket) {
	socket.on('join', function(room) {
		socket.leave(currentRoom[socket.id]);
		joinRoom(socket, room.newRoom);
	});
}

var handleClientDisconnect = function(socket){
	socket.on('disconnect', function() {
		var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
		delete namesUsed[nameIndex];
		delete nickNames[socket.id];
	})
}
