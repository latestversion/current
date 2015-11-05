evalFile("Entity.js")

function Room()
{
  Entity.call(this)
  LogicEntity.call(this)
  HasCharacters.call(this)
  HasItems.call(this)
  HasPortals.call(this)
  HasRegion.call(this)
}

var _p = Room.prototype = {}

CopyPrototype(Entity,Room)
CopyPrototype(HasCharacters,Room)
CopyPrototype(HasItems,Room)
CopyPrototype(HasPortals,Room)
CopyPrototype(HasRegion,Room)
CopyPrototype(LogicEntity,Room)
