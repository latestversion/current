function TickerClock()
{
  this.tc = {}
  this.tc.t = 0
  this.tc.lastTick = 0
  this.tc.maxdt = 10
}

var _p = TickerClock.prototype

_p.TickTime = function()
{
  if(!this.tc.lastTick)
  {
    this.tc.lastTick = Date.now()
    l1("TickerClock initialized at time " + this.tc.lastTick,LG_TIME)
  }

  var now = Date.now()
  var dt = now-this.tc.lastTick
  this.tc.lastTick = now

  if (dt > this.maxdt)
  {
    l1("dt greater than " + this.tc.maxdt + " ms, adjusting to " + this.tc.maxdt,LG_TIME)
    dt = this.tc.maxdt
  }

  this.tc.t += dt
}

_p.Time = function()
{
  return this.tc.t
}
