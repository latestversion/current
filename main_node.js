

var net = require('net');
var fs = require('fs')

readFile = function(file){
	var s = fs.readFileSync(file,"ascii")
return s
}

writeFile = function(file,data)
{
	fs.writeFileSync(file, data)
}

main_platform_wait = function(delay)
{
	var startTime = Date.now()
	var count = 0

	while(Date.now() - startTime < delay)
	{
	  count += 1
	}
}

console.log("Reading EvalFile.js")
var evalstring = readFile("EvalFile.js")
eval(evalstring)

evalFile("TelnetHandler.js")

var _streamcallback = 0

setupStream = function(callback)
{
  _streamcallback = callback
}

function newConnectionHandler(c)
{
  l("Client connected.")
  var stream = new TelnetHandler(c)
  _streamcallback(stream)
}

evalFile("main.js")

var server = net.createServer(newConnectionHandler)
var port = 8124
server.listen(port, function serverBoundHandler(){console.log('server bound ' + port)})
