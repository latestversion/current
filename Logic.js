evalFile("Entity.js")
evalFile("DataEntity.js")

function Logic(id)
{
  Entity.call(this)
  DataEntity.call(this)
  this.SetID(id)
}

CopyPrototype(Entity,Logic)
CopyPrototype(DataEntity,Logic)

var _p = Logic.prototype

_p.DoAction = function()
{
  throw "call to abstract DoAction"
}
