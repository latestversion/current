evalFile("Entity.js")

function ErrorLogic(player)
{
	Entity.call(this)
	this.SetName("error")
	this.SetDescription("Reports error strings.")
	this.player = player
}

CopyPrototype(Entity,ErrorLogic)

var _p = ErrorLogic.prototype

_p.DoAction = function(a)
{
	if(a.name == this.Name())
	{
		var conn = this.player.Connection()
		conn.putn(a.text+"\n")
	}
}
