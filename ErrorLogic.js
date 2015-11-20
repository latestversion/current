evalFile("Entity.js")
evalFile("LogicFactory.js")

function ErrorLogic(id)
{
	Entity.call(this)
	this.SetName("error")
	this.SetDescription("Reports error strings.")
	this.id = id
}

CopyPrototype(Entity,ErrorLogic)

var _p = ErrorLogic.prototype

_p.DoAction = function(a)
{
	if(a.name == this.Name())
	{
		var player = cdb.Get(this.id)
		var conn = player.Connection()
		conn.putn(a.text+"\n")
	}

  return true
}

LogicFactory.RegisterLogic(ErrorLogic)
