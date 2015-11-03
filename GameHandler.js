
function GameHandler(stream,cid)
{
  this.stream = stream
  this.cid = cid
}

var _p = GameHandler.prototype = {}

_p.tick = function()
{
  var stream = this.stream
  var input = this.stream.get()

  if(input)
  {
    Game.DoCommand(input,cid)
  }
}
