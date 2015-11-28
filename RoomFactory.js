evalFile("Room.js")

function RoomFactory(){}

RoomFactory.prototype.Create = function(tid,id)
{
  var r = new Room()
  r.SetID(id)
  return r
}

var RoomFactory = new RoomFactory()
