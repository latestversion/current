

evalFile("./AccountDatabase.js",this)
evalFile("./CharacterDatabase.js",this)
evalFile("./RegionDatabase.js",this)

var adb = new AccountDatabase()
var cdb = new CharacterDatabase()
var rgndb = new RegionDatabase()


adb.Load()
