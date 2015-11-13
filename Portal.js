function Portal()
{
  Entity.call(this)
  LogicEntity.call(this)
  DataEntity.call(this)
  HasRegion.call(this)
  HasEntries.call(this)
}

CopyPrototype(Entity,Portal)
CopyPrototype(HasRegion,Portal)
CopyPrototype(DataEntity,Portal)
CopyPrototype(LogicEntity,Portal)
CopyPrototype(HasEntries,Portal)

var _p = Portal.prototype

_p.DestinationRoomForStartRoomAndDirection = function(rid,direction)
{
	l1("Checking entries for rid,dir -> " + rid + "" + direction,LG_SPAM)
	this.BeginEntries()
	var entry
	while(entry = this.NextEntry())
	{
		if(entry.StartRoom() == rid && entry.Direction() == direction)
		{
			return entry.DestinationRoom()
		}
	}

	return false
}


_p.Add = function()
{

}

_p.Remove = function()
{

}

_p.Revive = function()
{
  this.BeginEntries()
  var entry
  while(entry = this.NextEntry())
  {
    entry.__proto__ = PortalEntry.prototype
  }
}

function PortalEntry(startroom,direction,destroom)
{
  this.startroom = startroom
  this.direction = direction
  this.destroom = destroom
}

var _p = PortalEntry.prototype

_p.StartRoom = function()
{
	return this.startroom
}

_p.Direction = function()
{
	return this.direction
}

_p.DestinationRoom = function()
{
	return this.destroom
}


