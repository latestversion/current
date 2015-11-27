evalFile("ItemFactory.js")


function DarkRoomLogic(id)
{
  Entity.call(this)
  this.id = id
  this.SetName("DarkRoomLogic")
}

var _p = DarkRoomLogic.prototype

CopyPrototype(Entity,DarkRoomLogic)

_p.DoAction = function(a)
{

  if(a.name == "attemptlookroom")
  {
      var room = Game.Room(this.id)
      var actor = Game.Character(a.arg1)

      if(this.ActorHasDarkSight(actor) || this.RoomHasAoeLight(room))
      {
        return true
      }

      actor.DoAction({name:"error",text:"A Dark Room\nIt's pitch black...\n"})
      return false
  }

  if("attemptsee" == a.name)
  {
    var actor = Game.GetEntity(a.arg1,a.arg2)
    var target = Game.GetEntity(a.arg3,a.arg4)

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
