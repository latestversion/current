
evalFile("Entity.js",this)
evalFile("HasRooms.js",this)

function Region()
{
  Entity.call(this)
  HasRooms.call(this)
}

Region.ENUM = 4

var _p = Region.prototype = {}

CopyPrototype(Entity,Region)
CopyPrototype(HasRooms,Region)
