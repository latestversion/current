
defaultscope = this

PLATFORM_NODE = "node"
PLATFORM_IOS = "ios"

PLATFORM = PLATFORM_NODE


if(PLATFORM_NODE == PLATFORM)
{
  var net = require('net');
  var fs = require('fs')
  var evaledFiles = {}
    evalFile = function(file,refscope){
    {
      //console.log(evaledFiles)
      if(evaledFiles[file])
      {
        return
      }

      var s = fs.readFileSync(file,"ascii")
      if(refscope)
      {
        refscope.eval(s)
      }
      else
      {
        defaultscope.eval(s)
      }
      evaledFiles[file] = true
    }


    readFile = function(file){
      var s = fs.readFileSync(file,"ascii")
      return s
    }
  }

  this.eval = eval
  evalFile("CopyPrototype.js")
  evalFile("Entity.js")
  evalFile("HasContainer.js",this)
  evalFile("TelnetHandler.js",this)
  evalFile("MenuHandler.js",this)
  evalFile("LoginHandler.js",this)
  evalFile("DatabaseInstances.js",this)
  evalFile("Game.js",this)

  var telnethandler = ""

  function newConnectionHandler(c)
  {
    console.log("Client connected.")
    telnethandler = new MenuHandler(new TelnetHandler(c))
  }

  var server = net.createServer(newConnectionHandler)
  server.listen(8124, function serverBoundHandler(){console.log('server bound')})
}


function loop()
{

  if(telnethandler)
  {
    telnethandler.tick()
  }

  /*InputHandler.tick()*/

  Game.tick()

  setTimeout(loop,5)
}

setTimeout(loop,0)


