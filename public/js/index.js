var socket = io();

socket.on('connect', function() {
	console.log("Connect to Server");

	socket.emit('createEmail', {
		to: 'testeCliente@hotmail.com',
		text: 'Hey, howdy'
	})
});

socket.on('disconnect', function() {
	console.log("Disconnected from server");
});

socket.on('newEmail', function(email) {
	console.log("New e-mail: ", email);
});