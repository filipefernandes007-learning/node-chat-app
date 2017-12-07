const path       = require('path');
const http       = require('http');
const socketIO   = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const fs         = require('fs');


const {generateMessage, generateLocationMessage} = require('./utils/message');

/**
 *
 * @type {*|createApplication}
 */
const express = require('express');

/**
 *
 */
var app = express();

/**
 *
 */
var server = http.createServer(app);

/**
 *
 */
var io = socketIO(server);

/**
 *
 * @type {*|number}
 */
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// handlers
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);

        //socket.emit('newEmail', newEmail);
    });

    // in real time you will able to pass, not only an event,
    // but an event data from the server to the client (browser),
    // something that we could never do with http request
    /*
    socket.emit('newEmail', {
        from: 'fx@gmail.com',
        text: 'Hey, you got an email',
        createAt: 123
    });
    */

    /*
    socket.emit('newMessage', {
        from: 'Me',
        text: 'See you then',
        createdAt: 123123
    });
    */

    // newMessage server -> client

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // sent to all but not to himself
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user joined'));

    // createMessage: client -> server
    socket.on('createMessage', (msg, callback) => {
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        callback('This is from server.');

        /*
        socket.broadcast.emit('newMessage', {
            from: msg.from,
            text: msg.text,
            createdAt: new Date().getTime()
        });
        */
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage',
                generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
});

/*
console.log(__dirname + '/../public');
console.log(publicPath);
*/

module.exports = {
    app: app
};

/**
 * Routes
 */

if(!module.parent) {
    try {
        var listener = server.listen(port, () => {
            console.log('Server started on port %d', listener.address().port);
        });
    } catch(e) {
        console.log(e.toString());
    }
}
