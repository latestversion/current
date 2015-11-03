

evalFile("Database.js",this)
evalFile("CopyPrototype.js",this)
evalFile("Account.js",this)

function AccountDatabase()
{
	Database.call(this)
}

var _p = AccountDatabase.prototype = {}

CopyPrototype(Database,AccountDatabase)

_p.Load = function(path)
{
	var s = readFile("./adb.json")
	this.database = JSON.parse(s)
	for(var i in this.database)
	{
		this.database[i].__proto__ = Account.prototype
	}
}
