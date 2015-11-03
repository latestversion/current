

evalFile("Database.js",this)
evalFile("CopyPrototype.js",this)
evalFile("Character.js",this)


function CharacterDatabase()
{
  Database.call(this)
}

var _p = CharacterDatabase.prototype = {}

CopyPrototype(Database,CharacterDatabase)
