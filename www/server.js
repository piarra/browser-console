var env = process.env.NODE_ENV || 'development';
var config = require('config');
var net = require('net'); 

var express = require('express');
var http = require('http');
var app = express();
var server = app.listen(config.get('port'));
var io = require('socket.io').listen(server);

config.get('staticPath').forEach(function(path) {
  app.use(path, express.static(config.get('staticBase') + path));
});

app.get('/notify', function(req, res) {
  io.sockets.emit('notify', {
    'message': req.query.message,
    'level': req.query.level,
    'type': req.query.type
  });
  res.send('ok');
});

app.post('/notify', function(req, res) {
  io.sockets.emit('notify', {
    'message': req.body.message,
    'level': req.body.level,
    'type': req.body.type
  });
  res.send('ok');
});

app.get('/*', function(req, res) {
  res.sendFile('index.html',  { root: config.get('staticBase') });
});

