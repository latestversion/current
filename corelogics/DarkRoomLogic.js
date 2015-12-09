evalFile("ItemFactory.js")


function DarkRoomLogic(id)
{
  Entity.call(this)
  this.id = id
  this.SetName("DarkRoomLogic")
}

CopyPrototype(Entity,DarkRoomLogic)

var _p = DarkRoomLogic.prototype

_p.DoAction = function(a)
{
  if(a.name == "attemptlookroom")
  {
      var room = Game.Room(this.id)
      var actor = Game.GetEntity(a.arg1)

      l1("{0} attempts to look at room {1}".format(actor.Name(),room.Name()))
      if(this.ActorHasDarkSight(actor))
      {
        return true
      }

      l1("The actor did not have darksight")

      if(this.RoomHasAoeLight(room))
      {
        return true
      }

      l1("The room did not have aoelight")

      if(!a.mute)
      {
        actor.DoAction({name:"error",text:"A Dark Room\nIt's pitch black..."})
      }

      return false
  }

  if("checkvisual" == a.name)
  {
    var actor = Game.GetEntity(a.arg1)
    var target = Game.GetEntity(a.arg2)

    var room = Game.Room(actor.Room())

    if(this.ActorHasDarkSight(actor) || this.RoomHasAoeLight(room) || this.TargetIsSelfLight(target))
    {
      return true
    }

    return false
  }

  return true

}

_p.TargetIsSelfLight = function(target)
{
  if(target.HasLogic("selflight") || !target.DoAction({name:"query",text:"selflight"}))
  {
    return true
  }
  return false
}


_p.ActorHasDarkSight = function(actor)
{
  if (actor.HasLogic("darksight") || !actor.DoAction({name:"query",text:"darksight"}) )
  {
    return true
  }

  return false
}

_p.RoomHasAoeLight = function(room)
{
  var charters = Game.EntitiesForIDs(room.Characters())
  for (var k = 0; k <  charters.length; k++)
  {
    var charter = charters[k]
    l1("DarkRoomLogic: RoomHasAoeLight: Querying char " + charter.Name() + " for aoelight")
    if (charter.HasLogic("aoelight") || !charter.DoAction({name:"query",text:"aoelight"}) )
    {
      return true
    }
  }

  return false
}

RegisterLogic(DarkRoomLogic)
