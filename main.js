
PLATFORM_NODE = "node"
PLATFORM_IOS = "ios"

PLATFORM = PLATFORM_NODE


if(PLATFORM_NODE == PLATFORM)
{
  var net = require('net');
  var fs = require('fs')
    evalFile = function(file,refscope){
    {
      var s = fs.readFileSync(file,"ascii")
      refscope.eval(s)
    }
  }

  this.eval = eval
  evalFile("./TelnetHandler.js",this)
  evalFile("./LoginHandler.js",this)
  evalFile("./CopyPrototype.js",this)
  evalFile("./DatabaseInstances.js",this)

  var telnethandler = ""

  function newConnectionHandler(c)
  {
    console.log("Client connected.")
    telnethandler = new LoginHandler(new TelnetHandler(c))
  }

  function serverBoundHandler()
  {
    console.log('server bound')
  }

  var server = net.createServer(newConnectionHandler)
  server.listen(8124, serverBoundHandler)
}

var delay = 5
var userinput = ""

function loop()
{
  var l = ""
  var th = telnethandler
  
  if(telnethandler)
  {
    telnethandler.tick()
  }

  setTimeout(loop,delay)
}

setTimeout(loop,0)


