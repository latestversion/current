
evalFile("Item")
evalFile("ArmsTypes")
evalFile("logics/FigurineLogic")


ItemTemplateIdCount = 1

var ItemTemplateIDs = {}

ItemTemplateIDs.MediocreCarrot = ItemTemplateIdCount++
ItemTemplateIDs.DamnFineCarrot = ItemTemplateIdCount++
ItemTemplateIDs.CuriousFrogFigurine = ItemTemplateIdCount++
ItemTemplateIDs.Shovel = ItemTemplateIdCount++

function ItemFactory()
{
	Entity.call(this)
	this.SetName("ItemFactory")
}

CopyPrototype(Entity,ItemFactory)

var _p = ItemFactory.prototype

_p.Create = function(tid,id)
{

	l1(this.Name() + ": Creating tid " + tid)

	if(tid >= ItemTemplateIdCount || tid <= 0)
	{
		l9("Item factory: template id out of range")
		return undefined
	}

  var i = new Item()
  i.SetTemplateID(tid)
  i.SetID(id)

  if (ItemTemplateIDs.MediocreCarrot == tid)
  {
	  i.SetName("A mediocre carrot")
	  i.SetDescription("It's a not so fine carrot.")
    i.SetAttribute("arms",ArmsTypes.Weapon)
  }
  else if (ItemTemplateIDs.DamnFineCarrot == tid)
  {
		i.SetName("A damn fine carrot")
		i.SetDescription("It's a DAMN fine carrot.")
  }
  else if(ItemTemplateIDs.CuriousFrogFigurine == tid)
  {
  	i.SetName("A figurine of the curious frog")
  	i.SetDescription("A curiosu frogu is a finu friend.")
    i.AddLogic(FigurineLogic)
  }
  else if(ItemTemplateIDs.Shovel == tid)
  {
    i.SetName("A rusty shovel")
    i.SetDescription("This shovel is past its prime.")
    i.SetAttribute("arms",ArmsTypes.Weapon)
  }
  else
  {
  	l9(this.Name() + ": No fitting template for tid " + tid)
  	return undefined
  }

  return i
}

ItemFactory = new ItemFactory()
