function RoomDatabase()
{
  Database.call(this,"rooms.data",Room.prototype)
  this.SetName("RoomDb")
}

var _p = RoomDatabase.prototype

CopyPrototype(Database,RoomDatabase)
