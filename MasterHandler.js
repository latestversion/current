function RootHandler(stream)
{
  HandlerManager.call(this)
  this.stream = stream
}

var _p = MasterHandler.prototype

CopyPrototype(HandlerManager,RootHandler)

_p.tick = function()
{
  var input = this.stream.get()
  if(input)
  {
    var ch = this.getCurrentHandler()
    if(ch)
    {
      ch.onInput(input)
    }
  }
}
