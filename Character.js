
evalFile("BasicDataClasses.js",this)
evalFile("HasItems.js",this)
evalFile("DataEntity.js",this)
evalFile("LogicEntity.js",this)
evalFile("HasCommands.js",this)

function Character()
{
  HasRegion.call(this)
  HasRoom.call(this)
  HasItems.call(this)
  HasTemplate.call(this)
  DataEntity.call(this)
  LogicEntity.call(this)
  HasCommands.call(this)

  this.account = 0
  this.quiet = false
  this.verbose = false
  this.loggedin = false
  this.lastcommand = ""
  this.connection = 0
}

var _p = Character.prototype = {}

CopyPrototype(HasRegion,Character)
CopyPrototype(HasRoom,Character)
CopyPrototype(HasTemplate,Character)
CopyPrototype(HasItems,Character)
CopyPrototype(DataEntity,Character)
CopyPrototype(LogicEntity,Character)
CopyPrototype(HasCommands,Character)

_p.GetAccount = function()
{
  return this.account
}

_p.SetAccount = function(acc)
{
  this.account = acc
}

_p.IsPlayer = function()
{
  return this.account ? true : false
}

_p.TurnToPlayer = function()
{
  this.account = 77
}

_p.GetConnection = function()
{
  return this.connection
}

_p.SetConnection = function(connection)
{
  this.connection = connection
}



