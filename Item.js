
evalFile("Entity.js")
evalFile("DataEntity.js")

function Item(id,name,desc)
{
  Entity.call(this)
  LogicEntity.call(this)
  DataEntity.call(this)
  HasTemplate.call(this)
  HasRoom.call(this)
  HasCharacter.call(this)

  this.SetID(id)
  this.SetName(name)
  this.SetDescription(desc)
  this.SetTemplateID(this.Type())
}

CopyPrototype(Entity,Item)
CopyPrototype(LogicEntity,Item)
CopyPrototype(DataEntity,Item)
CopyPrototype(HasTemplate,Item)
CopyPrototype(HasRoom,Item)
CopyPrototype(HasCharacter,Item)

var _p = Item.prototype

_p.Revive = function()
{
  l1("Item Revive",LG_SPAM)
  l1("This item has {0} logics".format(this.logics.length),LG_SPAM)
  var k
  for (k in this.logics)
  {
    if(this.logics[k].type)
    {
      l1("Item: Revive: Logic type: " + this.logics[k].type,LG_SPAM)
      this.logics[k].__proto__  = global[this.logics[k].type].prototype
    }
  }
}
