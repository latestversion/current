function HandlerHandler()
{
  this.curhandler = false
}

var _p = HandlerHandler.prototype = {}

_p.SetCurrentHandler = function(h)
{
  this.curhandler = h
}


