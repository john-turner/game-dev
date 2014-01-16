var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')
	,  io = require('socket.io')
	, heroes = require('./game/heroes.js');

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


var server = http.createServer(app).listen(app.get('port'), function() {
	console.log("Server listening on port " + app.get('port'));
});

io = io.listen(server);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.emit('heroes', heroes.getHeroes());
  socket.on('my other event', function (data) {
    console.log(heroes);
  });
});
