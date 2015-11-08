

evalFile("Database.js",this)
evalFile("Room.js",this)
evalFile("Region.js",this)
evalFile("Item.js",this)
evalFile("Portal.js",this)


// Let's encapsulate this nicely. In the future. Some day.
var cdb = new Database("characters.data",Character.prototype)
cdb.SetFactory(CharacterFactory)
var rgndb = new Database("regions.data",Region.prototype)
var rdb = new Database("rooms.data",Room.prototype)
var idb = new Database("items.data",Item.prototype)
var pdb = new Database("portals.data", Portal.prototype)

l("Database Instances created")

idb.Purge()

dbinstances = []

dbinstances[Character.ENUM] = cdb
dbinstances[Region.ENUM] = rgndb
dbinstances[Room.ENUM] = rdb
dbinstances[Item.ENUM] = idb
dbinstances[Portal.ENUM] = pdb


function DatabaseInstanceBearer()
{
  this.cdb = cdb
  this.idb = idb
  this.rgndb = rgndb
  this.pdb = pdb
  this.rdb = rdb
}


function CheckDatabaseConsistency(dbs)
{

}
