evalFile("./Database.js",this)
evalFile("./CopyPrototype.js",this)
evalFile("./Item.js",this)

function ItemDatabase()
{
  Database.call(this)
}

var _p = AccountDatabase.prototype = {}

CopyPrototype(Database,ItemDatabase)
