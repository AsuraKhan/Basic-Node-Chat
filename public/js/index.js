var socket = io();

socket.on('connect', function() {
	console.log("Connect to Server");

	// socket.emit('createMessage', {
	// 	from: 'Someone from client',
	// 	to: 'testeCliente@hotmail.com',
	// 	text: 'Hey, howdy'
	// })
});

socket.on('disconnect', function() {
	console.log("Disconnected from server");
});

socket.on('newMessage', function(message) {
	console.log("New e-mail: ", message);
});