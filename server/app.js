var app = require('express')();
var http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors')
const port = 3000

app.use(cors())

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(port, function(){
  console.log('listening on *:3000');
});

io.on('connection', function (socket) {
  socket.on('currentNumber', function (currentNumber) {
    console.log(currentNumber, '>>>>>>>>>>>>>> CURRENT NUMBER')
    io.emit('nowNumber', currentNumber)
  })
})
