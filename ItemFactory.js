
evalFile("Item.js",this)


ItemTemplateIdCount = 1

var ItemTemplateIDs = {}

ItemTemplateIDs.MediocreCarrot = ItemTemplateIdCount++
ItemTemplateIDs.DamnFineCarrot = ItemTemplateIdCount++
ItemTemplateIDs.CuriousFrogFigurine = ItemTemplateIdCount++

function ItemFactory()
{
	Entity.call(this)
	this.SetName("ItemFactory")
}

CopyPrototype(Entity,ItemFactory)

var _p = ItemFactory.prototype

_p.Create = function(tid)
{

	l1(this.Name() + ": Creating tid " + tid)

	if(tid >= ItemTemplateIdCount || tid <= 0)
	{
		l9("Item factory: template id out of range")
		return undefined
	}

  var i = new Item()
  i.SetTemplate(tid)

  if (ItemTemplateIDs.MediocreCarrot == tid)
  {
	  i.SetName("A mediocre carrot")
	  i.SetDescription("It's a not so fine carrot.")
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
  }
  else
  {
  	l9(this.Name() + ": No fitting template for tid " + tid)
  	return undefined
  }

  return i
}

ItemFactory = new ItemFactory()
