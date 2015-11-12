
evalFile("Entity.js",this)
evalFile("HasRooms.js",this)

function Region()
{
  Entity.call(this)
  HasRooms.call(this)
}

var _p = Region.prototype

CopyPrototype(Entity,Region)
CopyPrototype(HasRooms,Region)
