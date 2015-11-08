function Portal()
{
  LogicEntity.call(this)
  DataEntity.call(this)
  HasRegion.call(this)
  HasArray.call(this,"entries")
}

Portal.ENUM = 3

var _p = Portal.prototype

CopyPrototype(HasRegion,Portal)
CopyPrototype(DataEntity,Portal)
CopyPrototype(LogicEntity,Portal)
CopyPrototype(HasArray.getPrototypeInstance("entries"),Portal)

_p.Add = function()
{

}

_p.Remove = function()
{

}

function PortalEntry(startroom,direction,destroom)
{
  this.startroom = startroom
  this.direction = direction
  this.destroom = destroom
}

var _p = PortalEntry.prototype


