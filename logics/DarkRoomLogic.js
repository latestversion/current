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

      if (!actor.DoAction({name:"query",text:"darksight"}))
      {
        return true
      }

      var charters = Game.ChartersInRoom(room)
      for (var k in charters)
      {
        var charter = charters[k]
        if (charter.DoAction({name:"query",text:"aoelight"}))
        {
          return true
        }
      }

      actor.DoAction({name:"error",text:"A Dark Room\nIt's pitch black...\n"})
      return false
  }

  return true

}

RegisterLogic(DarkRoomLogic)