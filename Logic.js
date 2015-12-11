evalFile("Entity.js")
evalFile("DataEntity.js")

function Logic(ownerid)
{
  Entity.call(this)
  DataEntity.call(this)
  this.ownerid = ownerid
  this.handle = 0
  this.SetID(IDBank.GetFreeID(TypeEnums.Logic))
}

CopyPrototype(Entity,Logic)
CopyPrototype(DataEntity,Logic)

var _p = Logic.prototype

_p.OwnerID = function()
{
  return this.ownerid
}

_p.Handle = function()
{
  return this.handle
}

_p.SetHandle = function(handle)
{
  return this.handle = handle
}

_p.DoAction = function()
{
  throw "call to abstract DoAction"
}
