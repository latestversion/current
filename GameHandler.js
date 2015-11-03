
function GameHandler(manager,stream,cid)
{
  this.stream = stream
  this.cid = cid
}

var _p = GameHandler.prototype = {}

_p.onInput = function(input)
{
  Game.DoCommand(input,cid)
}
