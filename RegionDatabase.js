
evalFile("RegionFactory.js")

function RegionDatabase()
{
  Database.call(this,"regions.data",Region.prototype,TypeEnums.Region)
  this.SetName("RegionDb")
  this.SetFactory(new RegionFactory())
}

var _p = RegionDatabase.prototype

CopyPrototype(Database,RegionDatabase)
