evalFile("BasicDataClasses.js")
evalFile("LogicEntity.js")
evalFile("ItemFactory.js")

function InvisibleLogic(id)
{
  Entity.call(this)
  this.SetID(id)
  this.SetName("InvisibleLogic")
}

var _p = InvisibleLogic.prototype

CopyPrototype(Entity,InvisibleLogic)

_p.DoAction = function(a)
{
  if("checkvisual" == a.name && this.ID() == a.arg2)
  {
    var actor = Game.GetEntity(a.arg1)
    var target = Game.GetEntity(a.arg2)

    var room = Game.Room(actor.Room())

    if(actor.HasLogic("detectinvisible") || !actor.DoAction({name:"query",text:"detectsinvisible"}))
    {
      return false
    }

    return false
  }

  if("event" == a.name && "k" == a.text)
  {
    var entity = Game.GetEntity(this.ID())
    Game.AddAction({name:"say",arg1:this.ID(),text:"Im " + entity.Name() + " saying hello 'cause im invis"},40)
    Game.AddAction({name:"physicalevent",purevisual:true,actors:[this.ID()],arg1:entity.Room(),text:"The frog power is increasing!!"},50)
  }

  return true
}
