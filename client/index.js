const express = require('express');
//native node libary, working with low level of http request
const http = require('http');
const path = require('path');

//set up express
const app = express();

// static files
app.use('/images', express.static(__dirname + '/../public/images'));
app.use('/avatar', express.static(__dirname + '/../public/avatar'));
app.use('/', express.static(__dirname + '/dist'));
app.use('/style', express.static(__dirname + '/style'));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// change to 80
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
console.log('Sever listening on:', port);
