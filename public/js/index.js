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
    $('#messages').scrollTop( 99999 );
    if(window.blur()){
    	notifyMe(`${message.from}: ${message.text}`);  	
    }
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

function notifyMe(msg) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(msg);
    setTimeout(notification.close.bind(notification), 2000);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(msg);
        setTimeout(notification.close.bind(notification), 2000);

      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}
