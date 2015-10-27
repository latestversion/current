

evalFile("./Database.js",this)
evalFile("./CopyPrototype.js",this)


function AccountDatabase()
{
	Database.call(this)
}

var _p = AccountDatabase.prototype = {}

CopyPrototype(Database,AccountDatabase)