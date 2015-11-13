function Portal()
{
  Entity.call(this)
  LogicEntity.call(this)
  DataEntity.call(this)
  HasRegion.call(this)
  HasEntries.call(this)
}

var _p = Portal.prototype

CopyPrototype(Entity,Portal)
CopyPrototype(HasRegion,Portal)
CopyPrototype(DataEntity,Portal)
CopyPrototype(LogicEntity,Portal)
CopyPrototype(HasEntries,Portal)


_p.HasEntryForRoomAndDirection = function(rid,direction)
{
	l1("Checking entries for rid,dir -> " + rid + "" + direction,LG_SPAM)
	this.BeginEntries()
	var entry
	while(entry = this.NextEntry())
	{
		if(entry.startroom == rid && entry.direction == direction)
		{
			return true
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


