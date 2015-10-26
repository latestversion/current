var net = require('net');


var delay = 5000 
var userinput = ""

function dataReceived(d)
{
	userinput += d.toString('ascii')
	//console.log(d)
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
	var returnidx = userinput.indexOf("\n")
	//console.log("The newline index is " + returnidx)


	if(returnidx < 0)
	{
		setTimeout(gameloop,3000)
		return
	}
	var firstcmd = userinput.substring(0,returnidx)
	if(userinput.length > 1)
	{
		userinput = userinput.substring(1)
	}	
	console.log("The cmd is " + firstcmd)
	console.log("The use rinput is " + userinput)
	//setTimeout(gameloop,7000)
}

setTimeout(gameloop,3000)


