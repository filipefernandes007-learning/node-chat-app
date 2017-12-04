var socket = io();

socket.on('connect', function() {
    console.log('Connected to server!');

    /*
    socket.emit('createEmail', {
        to: 'rij@gmail.com',
        text: 'Hi baby!'
    });
    */

    socket.emit('createMessage', {
        from: 'fx@gmail.com',
        text: 'A new message'
    });

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
});