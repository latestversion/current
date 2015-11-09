function CharacterDatabase()
{
  Database.call(this,"characters.data",Character.prototype)
  this.SetName("CharacterDb")
}

var _p = CharacterDatabase.prototype

CopyPrototype(Database,CharacterDatabase)
