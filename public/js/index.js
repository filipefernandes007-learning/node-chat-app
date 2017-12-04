var socket = io();

socket.on('connect', function() {
    console.log('Connected to server!');
});

socket.on('disconnect', function() {
    console.log('Disconnected form server.');
});

// in real time you will able to pass, not only an event,
// but an event data from the server to the client (browser),
// something that we could never do with http request
/*
socket.on('newEmail', function(email) {
    console.log('New email', email);
});
*/

socket.on('newMessage', (msg) => {
    console.log('newMessage', msg);

    var li = $('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);
    $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    });
});