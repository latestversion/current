
PLATFORM_NODE = "node"
PLATFORM_IOS = "ios"

PLATFORM = PLATFORM_NODE


if(PLATFORM_NODE == PLATFORM)
{
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
}

  console.log("Reading EvalFile.js")
  var evalstring = readFile("EvalFile.js")
  eval(evalstring)

  evalFile("log.js")
  evalFile("String.js")
  evalFile("Matchers.js")
  evalFile("Enums.js")
  evalFile("IDBank.js")
  evalFile("Action.js")
  evalFile("TimedAction.js")
  evalFile("CopyPrototype.js")
  evalFile("Entity.js")
  evalFile("logics/InvisibleLogic.js")
  evalFile("logics/FigurineLogic.js")
  evalFile("HasArray.js")
  evalFile("HasCharacters.js")
  evalFile("HasItems.js")
  evalFile("HasPortals.js")
  evalFile("HasEntries.js")
  evalFile("TelnetHandler.js")
  evalFile("MenuScene.js")
  evalFile("LoginHandler.js")
  evalFile("DatabaseInstances.js")
  evalFile("SceneHandler.js")
  evalFile("Game.js")

  var scenehandler = ""

  function newConnectionHandler(c)
  {
    l("Client connected.")
    var stream = new TelnetHandler(c)
    scenehandler = new SceneHandler(stream)
    scenehandler.PushScene(new MenuScene(scenehandler,stream))
  }

  var server = net.createServer(newConnectionHandler)
  server.listen(8124, function serverBoundHandler(){console.log('server bound')})



function loop()
{

  if(scenehandler)
  {
    scenehandler.Tick()
  }

  setTimeout(loop,5)
}

setTimeout(loop,0)


