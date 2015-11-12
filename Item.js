
evalFile("Entity.js")

function Item()
{
  Entity.call(this)
}

var _P = Item.prototype

CopyPrototype(Entity,Item)

