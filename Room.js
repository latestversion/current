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

CopyPrototype(Entity,Room)
CopyPrototype(LogicEntity,Room)
CopyPrototype(DataEntity,Room)
CopyPrototype(HasCharacters,Room)
CopyPrototype(HasItems,Room)
CopyPrototype(HasPortals,Room)
CopyPrototype(HasRegion,Room)

var _p = Room.prototype

_p.Revive = function()
{
  l1("RoomRevive",LG_SPAM)
  l1("{0} has {1} logics".format(this.Name(),this.logics.length),LG_SPAM)
  var k
  for (k in this.logics)
  {
    if(this.logics[k].type)
    {
      l1("Logic type: " + this.logics[k].type,LG_SPAM)
      this.logics[k].__proto__  = global[this.logics[k].type].prototype
    }
  }

  for (k in this.portals)
  {
    if(this.portals[k].type)
    {
      l1("Portal type: " + this.portals[k].type,LG_SPAM)
      this.portals[k].__proto__  = global[this.portals[k].type].prototype
    }
  }

}
