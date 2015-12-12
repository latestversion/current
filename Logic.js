evalFile("Entity.js")
evalFile("DataEntity.js")

function Logic(ownerid)
{
  Entity.call(this)
  DataEntity.call(this)
  this.ownerid = ownerid
  this.eventid = 0
  this.SetID(IDBank.GetFreeID(TypeEnums.Logic))
}

CopyPrototype(Entity,Logic)
CopyPrototype(DataEntity,Logic)

var _p = Logic.prototype

_p.OwnerID = function()
{
  return this.ownerid
}

_p.EventID = function()
{
  return this.eventid
}

_p.SetEventID = function(eventid)
{
  return this.eventid = eventid
}

_p.DoAction = function()
{
  throw "call to abstract DoAction"
}
