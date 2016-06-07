
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
  evalFile("MenuScene.js")
  evalFile("LoginHandler.js")
  evalFile("DatabaseInstances.js")
  evalFile("SceneHandler.js")
  evalFile("Game.js")

  var scenehandler = ""

function streamCallback(stream)
{
  scenehandler = new SceneHandler(stream)
  scenehandler.PushScene(new MenuScene(scenehandler,stream))
}

setupStream(streamCallback)


function loop()
{
  if(scenehandler)
  {
    scenehandler.Tick()
  }

  setTimeout(loop,5)
}

setTimeout(loop,0)


