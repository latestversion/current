evalFile("Entity.js")
evalFile("LogicFactory.js")
evalFile("ItemFactory.js")
evalFile("Actions")

function RoryNoSackLogic(oid,itemid)
{
  Entity.call(this)
  Logic.call(this,oid)
  this.SetName("rorynosacklogic")
  this.SetDescription("makes Rory stop people from getting a sack")
  this.itemid = itemid
  // This could be made much more generic, and take a callback for what
  // to do when an attempt to get item has been detected.
  // But no.
}

CopyPrototype(Entity,RoryNoSackLogic)
CopyPrototype(Logic,RoryNoSackLogic)

var _p = RoryNoSackLogic.prototype

_p.DoAction = function(a)
{
  if(a.name == AttemptGetItemAction.Name && a.itemid == this.itemid)
  {
    var charter = Game.Character(a.cid)
    charter.DoAction(new InfoAction("Rory grabs your hand and slaps you in the face. 'Don't touch that you little rat!'"))
    return false
  }

  return true
}

RegisterLogic(RoryNoSackLogic)
