var net = require('net');

// Okay SO
// it would appear that telnet sends
// \r\n. Okay.

var delay = 5000
var userinput = ""

function dataReceived(d)
{
  userinput += d.toString('ascii')
}


var connection = null

var server = net.createServer(function(c) { //'connection' listener
  console.log('client connected');

  c.on('end', function() {
    console.log('client disconnected');
  });


  c.write('hello\r\n');

  c.on('data',dataReceived)

  connection = c

});
server.listen(8124, function() { //'listening' listener
  console.log('server bound');
});

function gameloop()
{
	console.log("gameloop")

  console.log("userinput: ***" + userinput + "***")


  var cridx = userinput.indexOf("\r")
  if(cridx > 0)
  {
    console.log("omg I found a carriage return")
  }
	var returnidx = userinput.indexOf("\n")
  console.log("The newline index is " + returnidx)


	if(returnidx < 0)
	{
		//setTimeout(gameloop,3000)
		return
	}
	var cmd = userinput.substring(0,returnidx)
	if(userinput.length > 1)
	{
		userinput = userinput.substring(returnidx)
	}
  console.log("cmd length: " + cmd.trim().length)
	console.log("The cmd is " + cmd.trim() + "*")
	console.log("The user input is " + userinput)
}

setTimeout(gameloop,10000)


