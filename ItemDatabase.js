evalFile("Database.js",this)
evalFile("CopyPrototype.js",this)
evalFile("Item.js",this)
evalFile("ItemFactory.js",this)

function ItemDatabase()
{
  Database.call(this,"items.data",Item.prototype)
  this.SetName("ItemDB")
  this.SetFactory(ItemFactory)
}

var _p = ItemDatabase.prototype

CopyPrototype(Database,ItemDatabase)
