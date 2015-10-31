
evalFile("./Database.js",this)
evalFile("./CopyPrototype.js",this)
evalFile("./Room.js",this)

function RoomDatabase()
{
  Database.call(this)
}

var _p = RoomDatabase.prototype = {}

CopyPrototype(Database,RoomDatabase)
