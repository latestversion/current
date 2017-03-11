evalFile("Entity.js")
evalFile("LogicFactory.js")
evalFile("ItemFactory.js")
evalFile("Actions")
evalFile("mudquest/MudQuestEvents")

function OrphanPigLogic(oid)
{
  Entity.call(this)
  Logic.call(this,oid)
  this.SetName("orphanpiglogic")
  this.SetDescription("makes bearer attackable, sends pig in distress action, etc")
  this.state = OrphanPigLogic.State_Calm
  this.messinterval = 7000
  this.ScheduleMessage()
  this.messages = [["Orphan pig enjoys the mud."],["Orphan pig oinks in distress!"]]
}
OrphanPigLogic.State_Calm = 0
OrphanPigLogic.State_Distressed = 1

CopyPrototype(Entity,OrphanPigLogic)
CopyPrototype(Logic,OrphanPigLogic)

var _p = OrphanPigLogic.prototype

_p.DoAction = function(a)
{
  l1(this.Name() + ": DoAction")

  // Make little pig attackable :(
  if(a.name == QueryCanAttackAction.Name)
  {
    l1(this.Name() + "Attack query")
    return false
  }

  this.CheckForMessage(a)

  // TODO: Check for calming event

  if(this.state == OrphanPigLogic.State_Calm)
  {
    return this.DoCalmState(a)
  }
  else
  {
    return this.DoDistressedState(a)
  }

  return true
}

_p.CheckForMessage = function(a)
{
  if(a.name == MessageLogicAction.Name && a.text == this.Name())
  {
    var msg = this.messages[this.state][0]
    l1("Orphan pig message is: " + msg)
    var roomid = Game.Entity(this.OwnerID()).Room()
    var room = Game.Room(roomid)
    Game.DoActionForCharactersInRoom(room,new InfoAction(msg),[this.OwnerID()])
    this.ScheduleMessage()
  }

}

_p.ScheduleMessage = function()
{
  Game.AddAction(new MessageLogicAction(0,this.OwnerID(),this.Name()), this.messinterval)
}

_p.DoDistressedState = function(a)
{

  if(a.name == AttemptAttackAction.Name && a.targetid == this.OwnerID())
  {
    var charter = Game.Character(a.cid)
    charter.DoAction(new InfoAction(this.Name() + " is running around too much for you to fight it!"))
    return false
  }

  return true
}

_p.DoCalmState = function(a)
{
  if(a.name == AttemptAttackAction.Name && a.targetid == this.OwnerID())
  {
    var charter = Game.Character(a.cid)
    charter.DoAction(new InfoAction("'Oink!??' Your attack scares the pig into a running flight!"))
    this.state = OrphanPigLogic.State_Distressed
    Game.DoAction(new EventAction(MudQuestEvents.PigInDistress,charter.Region(),ScopeEnums.Region))
    return false
  }

  return true
}


RegisterLogic(OrphanPigLogic)
