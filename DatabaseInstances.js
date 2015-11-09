

evalFile("Database.js",this)
evalFile("Room.js",this)
evalFile("Region.js",this)
evalFile("Item.js",this)
evalFile("Portal.js",this)
evalFile("ItemDatabase.js",this)
evalFile("CharacterDatabase.js",this)
evalFile("PortalDatabase.js",this)
evalFile("RoomDatabase.js",this)
evalFile("RegionDatabase.js",this)


// Let's encapsulate this nicely. In the future. Some day.
var cdb = new CharacterDatabase()
cdb.SetFactory(CharacterFactory)
var rgndb = new RegionDatabase()
var rdb = new RoomDatabase()
var idb = new ItemDatabase()
var pdb = new PortalDatabase()

l("Database Instances created")

idb.Purge()

dbinstances = []

// In a truly cool design with shared id pool and only non-specified entities,
// these enums would not be here.
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
