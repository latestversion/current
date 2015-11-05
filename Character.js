
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
  this.scenehandler = 0
  this.isplayer = false
}

var _p = Character.prototype = {}

CopyPrototype(HasRegion,Character)
CopyPrototype(HasRoom,Character)
CopyPrototype(HasTemplate,Character)
CopyPrototype(HasItems,Character)
CopyPrototype(DataEntity,Character)
CopyPrototype(LogicEntity,Character)
CopyPrototype(HasCommands,Character)

_p.Account = function()
{
  return this.account
}

_p.SetAccount = function(account)
{
  this.account = account
}

_p.SetConnection = function(connection)
{
  this.connection = connection
}

_p.Connection = function()
{
  return this.connection
}

_p.IsPlayer = function()
{
  return this.isplayer
}

_p.SetPlayer = function(flag)
{
  this.isplayer = flag
}

_p.SetSceneHandler = function(scenehandler)
{
  this.scenehandler = scenehandler
}

_p.SceneHandler = function()
{
  return this.scenehandler
}




