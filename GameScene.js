
function GameScene(scenehandler,stream,cid)
{
    Scene.call(this,scenehandler,stream)
    this.cid = cid
}

var _p = GameScene.prototype

_p.Tick = function(input)
{
	Game.Tick()
	if(input)
	{
      l("Input: " + input)
    	Game.DoCommand(input,this.cid)
	}
}
