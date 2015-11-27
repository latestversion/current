evalFile("ItemFactory.js")


function DarkRoomLogic(id)
{
  Entity.call(this)
  this.id = id
  this.SetName("DarkRoomLogic")
}

var _p = DarkRoomLogic.prototype

CopyPrototype(Entity,DarkRoomLogic)

_p.DoAction = function(a)
{
  return true
}

RegisterLogic(DarkRoomLogic)