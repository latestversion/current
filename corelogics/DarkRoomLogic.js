evalFile("ItemFactory.js")


function DarkRoomLogic(id)
{
  Entity.call(this)
  this.id = id
  this.SetName("DarkRoomLogic")
}

CopyPrototype(Entity,DarkRoomLogic)

var _p = DarkRoomLogic.prototype


_p.ActorCanSeeInRoom = function(actor,room)
{

}

_p.DoAction = function(a)
{

  if(a.name == "attemptlookroom")
  {
      var room = Game.Room(this.id)
      var actor = Game.GetEntity(a.arg1)

      if(this.ActorHasDarkSight(actor) || this.RoomHasAoeLight(room))
      {
        return true
      }

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
  var charters = Game.ChartersInRoom(room)
  for (var k in charters)
  {
    var charter = charters[k]
    if (actor.HasLogic("aoelight") || !charter.DoAction({name:"query",text:"aoelight"}) )
    {
      return true
    }
  }

  return false
}

RegisterLogic(DarkRoomLogic)
