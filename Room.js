evalFile("Entity.js")

function Room()
{
  Entity.call(this)
}

var _P = Room.prototype = {}

CopyPrototype(Entity,Room)
