function Character()
{
  HasRegion.call(this)
  HasRoom.call(this)
  HasTemplate.call(this)
  HasContainer.call(this,"items")
  DataEntity.call(this)
  LogicEntity.call(this)
}

var _p = Character.prototype = {}

CopyPrototype(HasRegion,Character)
CopyPrototype(HasRoom,Character)
CopyPrototype(HasTemplate,Character)
CopyProperties(HasContainer.getPrototypeInstance("items"),Character.prototype)
CopyPrototype(DataEntity,Character)
CopyPrototype(LogicEntity,Character)

