evalFile("Entity.js")
evalFile("LogicFactory.js")
evalFile("ItemFactory.js")
evalFile("Actions")
evalFile("mudquest/MudQuestEvents.js")

function RoryPigSaverLogic(oid)
{
  Entity.call(this)
  Logic.call(this,oid)
  this.SetName("RoryPigSaverLogic")
  this.SetDescription("makes Rory save a pig when pig is in distress")
}

CopyPrototype(Entity,RoryPigSaverLogic)
CopyPrototype(Logic,RoryPigSaverLogic)

var _p = RoryPigSaverLogic.prototype

_p.DoAction = function(a)
{
  if(a.name == EventAction.Name && a.event == MudQuestEvents.PigInDistress)
  {
    var charter = Game.Character(this.OwnerID())
    Game.AddAction(new ShoutAction(this.OwnerID(),"Leave the pig alone!!"),2000) // Rory says something
    Game.AddAction(new ShoutAction(this.OwnerID(),"I'll get you for this you little rats!!"),4000)
    Game.AddAction(new MoveAction(this.OwnerID(),"west"),6000) // Rory walks west if not in same room as pig
    Game.AddAction(new SayAction(this.OwnerID(),"Don't disturb the little ham!"),8000)
    //Game.AddAction(,9000) // Rory says something
    //Game.AddAction(,12000) // Rory calms pig
    //Game.AddAction(,14000) // Comfort pig event

    //Game.AddAction(,)

    //charter.DoAction(new InfoAction("Rory grabs your hand and slaps you in the face. 'Don't touch that you little rat!'"))
    return false
  }

  return true
}

RegisterLogic(RoryPigSaverLogic)
