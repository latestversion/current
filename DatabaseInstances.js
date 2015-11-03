

evalFile("Database.js",this)
evalFile("AccountDatabase.js",this)
evalFile("CharacterDatabase.js",this)
evalFile("RegionDatabase.js",this)
evalFile("Room.js",this)

var cdb = new Database("characters.data",Character.prototype)
cdb.SetFactory(CharacterFactory)
var rgndb = new Database("regions.data",Region.prototype)
var rdb = new Database("rooms.data",Room.prototype)

