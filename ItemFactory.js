evalFile("Item")
evalFile("CtorRegistry")

ItemFactory = new CtorRegistry("ItemFactory")

RegisterItem = ItemFactory.Register.bind(ItemFactory)

function InheritAndRegisterItem(subclass)
{
  CopyPrototype(Item,subclass)
  RegisterItem(subclass)
}