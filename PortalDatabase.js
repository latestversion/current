function PortalDatabase()
{
  Database.call(this,"portals.data",Portal.prototype)
  this.SetName("PortalDb")
}

var _p = PortalDatabase.prototype

CopyPrototype(Database,PortalDatabase)
