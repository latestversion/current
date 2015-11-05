
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
  evalFile("Action.js")
  evalFile("CopyPrototype.js")
  evalFile("Entity.js")
  evalFile("HasContainer.js",this)
  evalFile("TelnetHandler.js",this)
  evalFile("MenuScene.js",this)
  evalFile("LoginHandler.js",this)
  evalFile("DatabaseInstances.js",this)
  evalFile("SceneHandler.js",this)
  evalFile("Game.js",this)

  var scenehandler = ""

  function newConnectionHandler(c)
  {
    console.log("Client connected.")
    var stream = new TelnetHandler(c)
    scenehandler = new SceneHandler(stream)
    scenehandler.PushScene(new MenuScene(scenehandler,stream))
  }

  var server = net.createServer(newConnectionHandler)
  server.listen(8124, function serverBoundHandler(){console.log('server bound')})
}


function loop()
{

  if(scenehandler)
  {
    scenehandler.Tick()
  }

  setTimeout(loop,5)
}

setTimeout(loop,0)


