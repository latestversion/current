
function GameScene(scenehandler,outstream,cid)
{
    Scene.call(this,scenehandler,outstream)
    this.cid = cid
}

var _p = GameScene.prototype = {}

_p.onInput = function(input)
{
    Game.DoCommand(input,this.cid)
}
