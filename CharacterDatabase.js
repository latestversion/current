function CharacterDatabase()
{
  Database.call(this,"characters.data",Character.prototype,TypeEnums.Character)
  this.SetName("CharacterDb")
  this.SetFactory(CharacterFactory)
}

var _p = CharacterDatabase.prototype

CopyPrototype(Database,CharacterDatabase)
