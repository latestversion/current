function HasRooms()
{
  HasContainer.call(this,"rooms")
}

var _p = HasRooms.prototype = {}

CopyProperties(HasContainer.getPrototypeInstance("rooms"),HasRooms.prototype)
