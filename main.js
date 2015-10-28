
PLATFORM_NODE = "node"
PLATFORM_IOS = "ios"

PLATFORM = PLATFORM_NODE


if(PLATFORM_NODE == PLATFORM)
{
  var net = require('net');
  var fs = require('fs')
  var evalFiles = {}
    evalFile = function(file,refscope){
    {
      console.log(evalFiles)
      if(evalFiles[file])
      {
        return
      }

      var s = fs.readFileSync(file,"ascii")
      refscope.eval(s)
      evalFiles[file] = true
    }


    readFile = function(file){
      var s = fs.readFileSync(file,"ascii")
      return s
    }
  }

  this.eval = eval
  evalFile("./TelnetHandler.js",this)
  evalFile("./MenuHandler.js",this)
  evalFile("./LoginHandler.js",this)
  evalFile("./CopyPrototype.js",this)
  evalFile("./DatabaseInstances.js",this)
  evalFile("./Game.js",this)

  var telnethandler = ""

  function newConnectionHandler(c)
  {
    console.log("Client connected.")
    telnethandler = new MenuHandler(new TelnetHandler(c))
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


