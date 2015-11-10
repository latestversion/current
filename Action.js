function Action(name,id1,id2,id3,text)
{
	this.name = name
	this.id1 = id1
	this.id2 = id2
	this.id3 = id3
	this.text = text
  this.timestamp = 0
}

var _p = Action.prototype

_p.Timestamp = function()
{
  return this.timestamp
}

_p.SetTimestamp = function(t)
{
  this.timestamp = t
}

