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
	console.log("Message: ", message.from, message.text);

	var li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	$('#messages').append(li);
});

// socket.emit('createMessage', {
// 		from: "Frank",
// 		text: "Hi"
// 	}, 
// 	function(data){
// 	console.log('got it from client - and - ', data);
// });

$('#message-form').on('submit', function(e){
	e.preventDefault();

	socket.emit('createMessage', {
	from: $('[name=user]').val(), 
	text: $('[name=message]').val()
	},function(){
		$('[name=message]').val(" ");
	});

});