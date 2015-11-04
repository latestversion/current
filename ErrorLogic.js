evalFile("Entity.js")

function ErrorLogic(player)
{
	Entity.call(this)
	this.SetName("error")
	this.SetDescription("Reports error strings.")
	this.player = player
}

var _p = ErrorLogic.prototype = {}

CopyPrototype(Entity,ErrorLogic)


_p.DoAction = function(action)
{
	if(action.name == this.Name())
	{
		var conn = this.player.Connection()
		conn.putn(action.args)
	}
}