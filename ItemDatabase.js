evalFile("Database.js",this)
evalFile("CopyPrototype.js",this)
evalFile("Item.js",this)

function ItemDatabase()
{
  Database.call(this,"items.data",Item.prototype)
  this.SetName("ItemDB")
}

var _p = ItemDatabase.prototype

CopyPrototype(Database,ItemDatabase)
