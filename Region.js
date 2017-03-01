
evalFile("Entity.js",this)
evalFile("HasRooms.js",this)

function Region()
{
  Entity.call(this)
  LogicEntity.call(this)
  HasRooms.call(this)
}

var _p = Region.prototype

CopyPrototype(Entity,Region)
CopyPrototype(LogicEntity,Region)
CopyPrototype(HasRooms,Region)

_p.Revive = function()
{
  l1("Region Revive",LG_SPAM)
  l1("This region has {0} logics".format(this.logics.length),LG_SPAM)
  var k
  for (k in this.logics)
  {
    if(this.logics[k].type)
    {
      l1("Region: Revive: Logic type: " + this.logics[k].type,LG_SPAM)
      this.logics[k].__proto__  = global[this.logics[k].type].prototype
    }
  }
}
