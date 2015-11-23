evalFile("LogicFactory.js")

function VisionLogic(id)
{
  Entity.call(this)
  this.cid = id
  this.SetName("vision")
}

var _p = VisionLogic.prototype

CopyPrototype(Entity,VisionLogic)

_p.DoAction = function(a)
{
  if(a.name == this.Name())
  {
    var c = cdb.Get(this.cid)
    c.Connection().putn(a.text)
  }

  return true
}

RegisterLogic(VisionLogic)
