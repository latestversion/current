evalFile("LogicEntity.js")
evalFile("Logic.js")

function LanternLogic(ownerid)
{
  Logic.call(this,ownerid)
  this.SetName("LanternLogic")
  this.createdlogichandle = 0
}

var _p = LanternLogic.prototype

CopyPrototype(Logic,LanternLogic)

_p.DoAction = function(a)
{
  l1("LanternLogic DoAction")

  if("query" == a.name && "aoelight" == a.text)
  {
    l1("LanternLogic: There was a query for aoelight. As it happens, I have it. ")
    return false
  }

  if("didarmitem" == a.name && this.OwnerID() == a.arg2)
  {
    l1("LanternLogic: My owner was armed")
    var charter = Game.Character(a.arg1)
    var newlogic = new LanternLogic(a.arg1)
    this.createdlogichandle = newlogic.ID()
    charter.AddExistingLogic(newlogic)
    l1("LanternLogic: Added new lantern logic to " + charter.Name())
    return
  }

  if("diddisarmitem" == a.name && this.OwnerID() == a.arg2)
  {
    l1("LanternLogic: My owner was disarmed")
    var charter = Game.Character(a.arg1)
    charter.RemoveLogicByID(this.createdlogichandle)
    l1("LanternLogic: Removed logic with ID " + this.createdlogichandle + " for char " + charter.Name())
    this.createdlogichandle = 0;
    return
  }

  return true
}


RegisterLogic(LanternLogic)
