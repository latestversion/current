

var inputbuffer = ""

function dataReceived(d)
{
  inputbuffer += d
  this.write("<" + d + ">")
}

var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  //c.pipe(c)
  dataReceived.bind(c)
  c.on("data",dataReceived)
});
server.listen(8124, function() { //'listening' listener
  console.log('server bound');
});



