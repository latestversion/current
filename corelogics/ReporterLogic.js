evalFile("LogicEntity.js")
evalFile("Logic.js")
evalFile("LogicFactory.js")

function ReporterLogic(ownerid)
{
  Logic.call(this,IDBank.GetFreeID(TypeEnums.Logic),ownerid)
  this.SetName("reporter")
  this.createdlogichandle = 0
  this.SetDescription("Reports different messages back to player.")
}

CopyPrototype(Logic,ReporterLogic)

var _p = ReporterLogic.prototype

_p.DoAction = function(a)
{
  if("error" == a.name || "info"  == a.name || "vision" == a.name)
  {
    var player = cdb.Get(this.OwnerID())
    var conn = player.Connection()
    conn.putn(a.text+"\n")
  }

  return true
}

RegisterLogic(ReporterLogic)
