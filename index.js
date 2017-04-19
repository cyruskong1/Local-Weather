var express = require('express');
var app = express();

var port = 3000;

app.use(express.static(__dirname + '/'));

app.listen(port, function (req, res) {
  console.log('Hi Cy, working on Local Weather on port ', + port)
  console.log('__dirname',__dirname)
});


app.get('/', function(req, res) {
  
  res.sendFile(__dirname + '/index.html')
})

