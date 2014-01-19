function divEscapedContentElement(message) {
	return $('<div></div>').text(message);
};

function divSystemContentElement(message) {
	return $('<div></div>').html('<i>' + message + '</i>');
};

function processUserInput(chatApp, socket) {
	var message = $('#send-message').val();
	var systemMessage;

	if(message.charAt(0) == '/') {
		systemMessage = chatApp.processCommand(message);
		if(systemMessage) {
			$('#messages').append(divSystemContentElement(systemMessage))
		}
	} else {
		chatApp.sendMessage($('#room').text(), message);
		$('#messages').append(divEscapedContentElement(message));
		$('#messages').scrollTop($('#messages').prop('scrollHeight'));
	}

	$('#send-message').val('');
};

var socket = io.connect();

$(document).ready(function() {
	var chatApp = new Chat(socket);

	socket.on('nameResult', function(result) {
		var message;
		if (result.succes) {
			message = 'Your name is ' + result.name + '.';
		} else {
			message = result.name;
		}
		console.log(message);
		$('#messages').append(divSystemContentElement(message));
	});

	socket.on('joinResult', function(result) {
		$('#room').text(result.room);
		$('#messages').append(divSystemContentElement('Room changed.'));
	});

	socket.on('message', function(message) {
		var newElement = $('<div></div>').text(message.text);
		$('#messages').append(newElement);
	});

	socket.on('rooms', function(rooms){
		$('#rooms-list').empty();

		for(var room in rooms) {
			room = room.substring(1, room.length);
			if (room != '') {
				$('#rooms-list').append(divEscapedContentElement(room));
			}
		}
		$('#rooms-list div').click(function() {
			chatApp.processCommand('/join ' + $(this).text());
			$('#send-message').focus();
		});
	});

	socket.on('usersInRoom', function(usersInRoom){
		$('#user-list').empty();
		for(var user in usersInRoom) {
			$('#user-list').append(divEscapedContentElement(usersInRoom[user]));
		}
	});
	//Get New Rooms Update
	setInterval(function() {
		socket.emit('rooms');
	}, 1000);

	setInterval(function() {
		socket.emit('usersInRoom');
	}, 1000);

	$('#send-message').focus(); //?

	$('#send-form').submit(function() {
		processUserInput(chatApp, socket);
		return false;
	});
});

$('#game').click(function() {
   document.location.href='/game';
});
