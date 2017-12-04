const path       = require('path');
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
var app    = express();

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

console.log(__dirname + '/../public');
console.log(publicPath);


module.exports = {
    app: app
};

/**
 * Routes
 */

if(!module.parent) {
    var listener = app.listen(port, () => {
        console.log('Server started on port %d', listener.address().port);
    });
}