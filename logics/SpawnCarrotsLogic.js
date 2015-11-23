evalFile("Entity.js")
evalFile("LogicFactory.js")
evalFile("ItemFactory.js")

function SpawnCarrotsLogic(roomid)
{
	Entity.call(this)
	this.SetName("spawncarrots")
	this.SetDescription("Spawns carrots.")
	this.id = roomid
	this.spawntime = 1000
	this.spawntemplateids = [ItemTemplateIDs.MediocreCarrot,ItemTemplateIDs.DamnFineCarrot]
	this.ScheduleAction()
}

CopyPrototype(Entity,SpawnCarrotsLogic)

var _p = SpawnCarrotsLogic.prototype

_p.DoAction = function(a)
{
	if(a.name == "messagelogic" && this.Name() == a.text)
	{
		l1(this.Name() + " got a MESSAGELOGIC action! Hooray!")
		this.CheckCarrots()
		this.ScheduleAction()
	}

  return true
}

_p.ScheduleAction = function()
{
	Game.AddAction({ name : "messagelogic",
		arg1 : TypeEnums.Room,
		arg2 : this.id,
		text : this.Name()
	},
	this.spawntime)
}

_p.CheckCarrots = function()
{
	var room = Game.rdb.Get(this.id)
	var items = Game.ItemsForEntity(room)
	var torespawn = this.spawntemplateids.slice(0)
	for(var i = 0; i < items.length; i++)
	{
		var idx = torespawn.indexOf(items[i].Template())
		torespawn[idx] = 0
	}

	for(var i = 0; i < torespawn.length;i++)
	{
		var respawn = torespawn[i]
		if(respawn)
		{
			l1("I am going to respawn an item with templateid " + respawn)
		}
	}
}

RegisterLogic(SpawnCarrotsLogic)