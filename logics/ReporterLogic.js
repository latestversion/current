evalFile("Entity.js")
evalFile("LogicFactory.js")

function ReporterLogic(id)
{
  Entity.call(this)
  this.SetName("reporter")
  this.SetDescription("Reports different messages back to player.")
  this.id = id
}

CopyPrototype(Entity,ReporterLogic)

var _p = ReporterLogic.prototype

_p.DoAction = function(a)
{
  if("error" == a.name || "info"  == a.name || "vision" == a.name)
  {
    var player = cdb.Get(this.id)
    var conn = player.Connection()
    conn.putn(a.text+"\n")
  }

  return true
}

RegisterLogic(ReporterLogic)
