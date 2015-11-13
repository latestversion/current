
evalFile("Entity.js")

function Item()
{
  Entity.call(this)
  HasRoom.call(this)
  HasCharacter.call(this)
}

CopyPrototype(Entity,Item)
CopyPrototype(HasRoom,Item)
CopyPrototype(HasCharacter,Item)

var _p = Item.prototype
