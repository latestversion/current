
evalFile("Entity.js")
evalFile("HasRooms.js")

function Region()
{
  Entity.call(this)
  HasRooms.call(this)
}

var _p = Region.prototype = {}

CopyPrototype(Entity,Region)
CopyPrototype(HasRooms,Region)
