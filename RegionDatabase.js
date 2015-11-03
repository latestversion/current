evalFile("Database.js",this)
evalFile("CopyPrototype.js",this)
evalFile("Region.js",this)

function RegionDatabase()
{
  Database.call(this)
}

var _p = AccountDatabase.prototype = {}

CopyPrototype(Database,RegionDatabase)
