evalFile("Entity.js")

function Room()
{
  Entity.call(this)
  LogicEntity.call(this)
  DataEntity.call(this)
  HasCharacters.call(this)
  HasItems.call(this)
  HasPortals.call(this)
  HasRegion.call(this)
}

Room.ENUM = 2

var _p = Room.prototype

CopyPrototype(Entity,Room)
CopyPrototype(LogicEntity,Room)
CopyPrototype(DataEntity,Room)
CopyPrototype(HasCharacters,Room)
CopyPrototype(HasItems,Room)
CopyPrototype(HasPortals,Room)
CopyPrototype(HasRegion,Room)

