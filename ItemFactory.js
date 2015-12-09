
evalFile("Item")
evalFile("ArmsTypes")
evalFile("logics/FigurineLogic")
evalFile("CtorRegistry")

ItemFactory = new CtorRegistry("ItemFactory")

RegisterItem = ItemFactory.Register.bind(ItemFactory)

function InheritAndRegisterItem(subclass)
{
  CopyPrototype(Item,subclass)
  RegisterItem(subclass)
}

function MediocreCarrot(id)
{
  Item.call(this,id,"A mediocre carrot","It's a not so fine carrot.")
  this.SetAttribute("arms",ArmsTypes.Weapon)
}
InheritAndRegisterItem(MediocreCarrot)

function DamnFineCarrot(id)
{
  Item.call(this,id,"A damn fine carrot","It's a DAMN fine carrot.")
}
InheritAndRegisterItem(DamnFineCarrot)

function CuriousFrogFigurine(id)
{
  Item.call(this,id,"A figurine of the curious frog","A curiosu frogu is a finu friend.")
  this.AddLogic(FigurineLogic)
}
InheritAndRegisterItem(CuriousFrogFigurine)

function Shovel(id)
{
  Item.call(this,id,"A rusty shovel","This shovel is past its prime.")
  this.SetAttribute("arms",ArmsTypes.Weapon)
}
InheritAndRegisterItem(Shovel)
