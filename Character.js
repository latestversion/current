function Character()
{
  HasRegion.call(this)
  HasRoom.call(this)
  HasItems.call(this)
  HasTemplate.call(this)
  DataEntity.call(this)
  LogicEntity.call(this)

  this.account = 0
  this.quiet = false
  this.verbose = false
  this.loggedin = false
  this.lastcommand = ""
}

var _p = Character.prototype = {}

CopyPrototype(HasRegion,Character)
CopyPrototype(HasRoom,Character)
CopyPrototype(HasTemplate,Character)
CopyPrototype(HasItems,Character)
CopyPrototype(DataEntity,Character)
CopyPrototype(LogicEntity,Character)

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



