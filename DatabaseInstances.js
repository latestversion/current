

evalFile("Database.js",this)
evalFile("Room.js",this)
evalFile("Region.js",this)
evalFile("Item.js",this)

var cdb = new Database("characters.data",Character.prototype)
cdb.SetFactory(CharacterFactory)
var rgndb = new Database("regions.data",Region.prototype)
var rdb = new Database("rooms.data",Room.prototype)
var idb = new Database("items.data",Item.prototype)

