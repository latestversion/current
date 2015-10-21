function Character()
{
  HasRegion.call(this)
  HasRoom.call(this)
  HasTemplate.call(this)
  HasItems.call(this)
  DataEntity.call(this)
  LogicEntity.call(this)
}

CopyPrototype(HasRegion,Character)
CopyPrototype(HasRoom,Character)
CopyPrototype(HasTemplate,Character)
CopyPrototype(HasItems,Character)
CopyPrototype(DataEntity,Character)
CopyPrototype(LogicEntity,Character)

