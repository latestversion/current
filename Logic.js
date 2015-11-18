evalFile("Entity.js")
evalFile("DataEntity.js")

function Logic()
{
  Entity.call(this)
  DataEntity.call(this)

}

CopyPrototype(Entity,Logic)
CopyPrototype(DataEntity,Logic)

var _p = Logic.prototype

_p.DoAction = function()
{
  throw "call to abstract DoAction"
}
