function FigurineLogic(id)
{
  Entity.call(this)
  this.id = id
  this.SetName("figurinelogic")
}

var _p = FigurineLogic.prototype

CopyPrototype(Entity,FigurineLogic)

_p.DoAction = function(a)
{
  if(a.name == "attemptmove" && a.arg2 == TypeEnums.Character)
  {
    var c = cdb.Get(a.arg1)
    if(c.IsPlayer())
    {
      c.DoAction({name:"vision",text:"A strange force holds you in place. 'Don't leave without me' says the Figurine of the Curious Frog\n"})
      return false
    }
  }

  if(a.name == "didgetitem" && a.arg2 == this.id)
  {
    var c = cdb.Get(a.arg1)
    if(c.IsPlayer())
    {
      c.DoAction({name:"vision",text:"The Figurine of the Curious Frog smiles wickedly as you put it in your backpack.\n"})
      return false
    }
  }

  return true
}
