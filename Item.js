
evalFile("Entity.js")

function Item()
{
  Entity.call(this)
}

Item.ENUM = 1

var _P = Item.prototype = {}

CopyPrototype(Entity,Item)

