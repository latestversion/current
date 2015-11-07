function HasRooms()
{
  HasArray.call(this,"rooms")
}

var _p = HasRooms.prototype = {}

CopyProperties(HasArray.getPrototypeInstance("rooms"),HasRooms.prototype)
