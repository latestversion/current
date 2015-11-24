evalFile("ItemFactory.js")


function ClosedGateOpenOnEventLogic(id)
{
  Entity.call(this)
  this.SetID(id)
  this.SetName("ClosedGateOpenOnEventLogic")
}

CopyPrototype(Entity,ClosedGateOpenOnEventLogic)

var _p = ClosedGateOpenOnEventLogic.prototype

_p.SetPassEvent = function(eventname)
{
  this.passevent = eventname
}

_p.PassEvent = function()
{
  return this.passevent
}


_p.DoAction = function(a)
{
  if(a.name == "attemptenterportal")
  {
    var charter = Game.Character(a.arg1)
    charter.DoAction({name:"error",text:"The little gate is closed."}) // So yeah this data belongs to portal
    return false
  }

  if(a.name == "event" && this.PassEvent() == a.text)
  {
    
    var portal = Game.Portal(this.ID())
    portal.RemoveLogic(ClosedGateOpenOnEventLogic)
  }

  return true
}

RegisterLogic(ClosedGateOpenOnEventLogic)


