var env = process.env.NODE_ENV || 'development';
var config = require('config');
var net = require('net'); 

var express = require('express');
var http = require('http');
var app = express();
var server = app.listen(config.get('port'));
var io = require('socket.io').listen(server);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));

config.get('staticPath').forEach(function(path) {
  app.use(path, express.static(config.get('staticBase') + path));
});

app.get('/notify', function(req, res) {
  io.sockets.emit('notify', {'message': req.query.message});
  res.send('ok');
});

app.post('/notify', function(req, res) {
  io.sockets.emit('notify', {'message': req.body.message});
  res.send('ok-post');
});

app.get('/*', function(req, res) {
  res.sendFile('index.html',  { root: config.get('staticBase') });
});

