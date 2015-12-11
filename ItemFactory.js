
evalFile("Item")
evalFile("ArmsTypes")
evalFile("logics/FigurineLogic")
evalFile("corelogics/LanternLogic")
evalFile("CtorRegistry")

ItemFactory = new CtorRegistry("ItemFactory")

RegisterItem = ItemFactory.Register.bind(ItemFactory)

function InheritAndRegisterItem(subclass)
{
  CopyPrototype(Item,subclass)
  RegisterItem(subclass)
}


function Weaponify(item,mindam,maxdam)
{
  item.SetAttribute("arms",ArmsTypes.Weapon)
  item.SetAttribute("mindamage",mindam)
  item.SetAttribute("maxdamage",maxdam)
}

function MediocreCarrot(id)
{
  Item.call(this,id,"A mediocre carrot","It's a not so fine carrot.")
  Weaponify(this,1,1)
}
InheritAndRegisterItem(MediocreCarrot)

function DamnFineCarrot(id)
{
  Item.call(this,id,"A damn fine carrot","It's a DAMN fine carrot.")
  Weaponify(this,10,20)
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
  Weaponify(this,0,2)
}
InheritAndRegisterItem(Shovel)

function Lantern(id)
{
  Item.call(this,id,"A big lantern","It will illuminate your path.")
  this.AddLogic(LanternLogic)
  this.SetAttribute("arms",ArmsTypes.Light)
}
InheritAndRegisterItem(Lantern)

function Ring(id)
{
  Item.call(this,id,"Ring of Quickness","This ring will make you quick enough to slay even a goblin!")
  this.SetAttribute("arms",ArmsTypes.Ring)
}
InheritAndRegisterItem(Ring)



