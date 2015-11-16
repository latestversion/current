
evalFile("BasicDataClasses.js",this)
evalFile("HasItems.js",this)
evalFile("DataEntity.js",this)
evalFile("LogicEntity.js",this)
evalFile("HasCommands.js",this)

function Character()
{
  Entity.call(this)
  LogicEntity.call(this)
  DataEntity.call(this)
  HasCommands.call(this)
  HasRegion.call(this)
  HasRoom.call(this)
  HasItems.call(this)
  HasTemplate.call(this)


  this.account = 0
  this.quiet = false
  this.verbose = false
  this.loggedin = false
  this.lastcommand = ""
  this.connection = 0
  this.scenehandler = 0
  this.isplayer = false
}

TypeEnums.Character = 0

var _p = Character.prototype

CopyPrototype(Entity,Character)
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

_p.Revive = function()
{
  l1("Character Revive",LG_SPAM)
  l1("This char has {0} logics".format(this.logics.length),LG_SPAM)
  var k
  for (k in this.logics)
  {
    if(this.logics[k].type)
    {
      l1("Logic type: " + this.logics[k].type,LG_SPAM)
      this.logics[k].__proto__  = global[this.logics[k].type].prototype
    }
  }
}


