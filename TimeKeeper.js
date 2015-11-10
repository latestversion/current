function GameTimeKeeper()
{
  this.time = 0
}


var _p = TimeKeeper.prototype

_p.TimeMs = function()
{
  return Date.now()-this.starttime
}

_p.TimeS = function()
{
  return this.TimeMs()/1000
}

_p.Stop = function()
{

}
