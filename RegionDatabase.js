function RegionDatabase()
{
  Database.call(this,"regions.data",Region.prototype)
  this.SetName("RegionDb")
}

var _p = RegionDatabase.prototype

CopyPrototype(Database,RegionDatabase)
