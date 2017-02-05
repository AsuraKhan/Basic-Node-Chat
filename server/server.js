const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const message = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log("new user connected");

	// socket.emit('newMessage', {
	// 	from: 'email@hotmail.com',
	// 	text: 'text of emails from server',
	// 	createdAt: 123
	// });
	socket.emit('newMessage', message.generateMessage("Admin", "Wellcome Guy"));

	socket.broadcast.emit("newMessage", message.generateMessage("Admin", "New Guy in room"));

	socket.on('createMessage', (message) => {
		console.log('createMessage', message.generateMessage("Admin", message));
		//io.emit('newMessage', message);
		socket.broadcast.emit('newMessage', message.generateMessage("Admin", message));
	});

	socket.on('disconnect', () => {
			console.log("User disconnected");
		});
});


server.listen(port, () => {
	console.log(' Server online on port ', port);
});