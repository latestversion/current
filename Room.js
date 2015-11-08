evalFile("Entity.js")

function Room()
{
  LogicEntity.call(this)
  DataEntity.call(this)
  HasCharacters.call(this)
  HasItems.call(this)
  HasPortals.call(this)
  HasRegion.call(this)
}

Room.ENUM = 2

var _p = Room.prototype

CopyPrototype(LogicEntity,Room)
CopyPrototype(DataEntity,Room)
CopyPrototype(HasCharacters,Room)
CopyPrototype(HasItems,Room)
CopyPrototype(HasPortals,Room)
CopyPrototype(HasRegion,Room)

