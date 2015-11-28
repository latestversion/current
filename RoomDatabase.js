evalFile("RoomFactory.js")


function RoomDatabase()
{
  Database.call(this,"rooms.data",Room.prototype)
  this.SetName("RoomDb")
  this.SetFactory(RoomFactory)
}

var _p = RoomDatabase.prototype

CopyPrototype(Database,RoomDatabase)
