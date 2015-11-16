
defaultscope = this

"use strict"

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

      evaledFiles[file] = true

      if(typeof l1 !== "undefined")
      {
        l1("evaling file " + file,LG_EVAL)
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

    }


    readFile = function(file){
      var s = fs.readFileSync(file,"ascii")
      return s
    }

    writeFile = function(file,data)
    {
      fs.writeFileSync(file, data)
    }
  }

  this.eval = eval
  evalFile("String.js")
  evalFile("Matchers.js")
  evalFile("log.js")
  evalFile("Enums.js")
  evalFile("ArrayIterator.js")
  evalFile("Action.js")
  evalFile("TimedAction.js")
  evalFile("CopyPrototype.js")
  evalFile("Entity.js")
  evalFile("FigurineLogic.js")
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


