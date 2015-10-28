

evalFile("./AccountDatabase.js",this)
evalFile("./CharacterDatabase.js",this)

var adb = new AccountDatabase()
var cdb = new CharacterDatabase()


adb.Load()