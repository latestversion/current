function PortalDatabase()
{
  Database.call(this,"portals.data",Portal.prototype,TypeEnums.Portal)
  this.SetName("PortalDb")
}

var _p = PortalDatabase.prototype

CopyPrototype(Database,PortalDatabase)
