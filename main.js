

evalFile("Game.js")

var Game = new Game("mudquest")

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


