var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')
	,  io = require('socket.io')
	, chat = require('./lib/chat.js')
	, game = require('./game/game.js');

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views'); 
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});


app.get('/', routes.index);
app.get('/game', routes.game);

var server = http.createServer(app).listen(app.get('port'), function() {
	console.log("Server listening on port " + app.get('port'));
});

io = io.listen(server);
io.set('log level', 1);
chat = chat.listen(io);
game = game.listen(io);
