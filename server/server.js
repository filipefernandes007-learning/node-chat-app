const path       = require('path');
const http       = require('http');
const socketIO   = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const fs         = require('fs');

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

/*
app.get('/', (req, res) => {
    fs.readFile(publicPath + '/index.html', 'utf8', (e, data) => {
        res.send(data);
    });
});
*/

app.use(express.static(publicPath));

//

io.on('connection', (socket) => {
    console.log('New user connected');


    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });
});

console.log(__dirname + '/../public');
console.log(publicPath);


module.exports = {
    app: app
};

/**
 * Routes
 */

if(!module.parent) {
    var listener = server.listen(port, () => {
        console.log('Server started on port %d', listener.address().port);
    });
}
