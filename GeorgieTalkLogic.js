evalFile("GeorgieCutscene.js")

function GeorgieTalkLogic(id)
{
  Entity.call(this)
  this.id = id
  this.SetName("GeorgieTalkLogic")
}

var _p = GeorgieTalkLogic.prototype

CopyPrototype(Entity,GeorgieTalkLogic)

_p.DoAction = function(a)
{
  if(a.name == "query" && a.text == "cantalk")
  {
    return false
  }

  if(a.name == "talk")
  {
    var c = cdb.Get(a.arg1)
    if(c.IsPlayer())
    {
      //c.DoAction({name:"vision",text:"'Bugger off' says Georgie.\n"})
      c.SceneHandler().PushScene(new GeorgieScene(c.SceneHandler(),c.Stream()))
      return false
    }
  }

  return true
}
