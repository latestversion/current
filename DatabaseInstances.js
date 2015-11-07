

evalFile("Database.js",this)
evalFile("Room.js",this)
evalFile("Region.js",this)
evalFile("Item.js",this)

var cdb = new Database("characters.data",Character.prototype)
cdb.SetFactory(CharacterFactory)
var rgndb = new Database("regions.data",Region.prototype)
var rdb = new Database("rooms.data",Room.prototype)
var idb = new Database("items.data",Item.prototype)
var pdb = new Database("portals.data", Portal.prototype)


// This could be in Database.js and be automatically populated by Database ctor
// Should be removed from global scope, etc.
var Dbs = []

Dbs[Character.ENUM] = cdb
Dbs[Region.ENUM] = rgndb
Dbs[Room.ENUM] = rdb
Dbs[Item.ENUM] = idb
Dbs[Portal.ENUM] = pdb

