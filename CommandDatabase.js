evalFile("Command.js")
evalFile("CommandFactory.js")

function CommandDatabase()
{
  Database.call(this,"",Command.prototype,TypeEnums.Command)
  this.SetName("CommandDatabase")
  this.SetFactory(CommandFactory)
}


var _p = CommandDatabase.prototype

CopyPrototype(Database,CommandDatabase)

_p.LoadDirectory = function(dir,purge)
{
  l1(this.Name() + " LoadDirectory void atm ",LG_DB)
}

