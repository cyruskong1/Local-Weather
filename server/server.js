var express = require('express');
var app = express()
var http = require('http');
var server = http.createServer(app);

var port = 3000;

app.use(express.static(__dirname + '/../public'));

app.get('*.js', function (req, res) {
  res.sendFile('./index.html')
});

server.listen(port, function () {
  console.log('Hi Cy, working on Local-Weather on port ' + port);
})