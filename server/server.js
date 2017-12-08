const path       = require('path');
const http       = require('http');
const socketIO   = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const fs         = require('fs');

const {isRealString} = require('./utils/validation.js');


const {generateMessage, generateLocationMessage} = require('./utils/message');
const {Users} = require('./utils/users');

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
 */
var users = new Users();

/**
 *
 * @type {*|number}
 */
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// handlers
io.on('connection', (socket) => {
    console.log('New user connected');

    /*
    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);

        //socket.emit('newEmail', newEmail);
    });
    */

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

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);

        console.log('Join', socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // socket.leave();

        // io.emit -> send to everyone connected; io.to(params.room).emit
        // socket.broadcast.emit -> send to all except to the user who is sending; socket.broadcast(params.room).emit
        // socket.emit -> send to one person; 

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        // sent to all but not to himself
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined to this room`));

        callback();
    });

    
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

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        console.log('User was disconnected.', socket.id, user, users);

        if(user) {
            console.log(user.room, users.getUserList(user.room));

            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left room ${user.room}`));
        }
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
