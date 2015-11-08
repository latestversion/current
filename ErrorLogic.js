evalFile("Entity.js")

function ErrorLogic(player)
{
	Entity.call(this)
	this.SetName("error")
	this.SetDescription("Reports error strings.")
	this.player = player
}

var _p = ErrorLogic.prototype

CopyPrototype(Entity,ErrorLogic)


_p.DoAction = function(a)
{
	if(a.name == this.Name())
	{
    l("eeeh")
		var conn = this.player.Connection()
		conn.putn(a.text)
	}
}
