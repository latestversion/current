
evalFile("CharacterFactory.js",this)
evalFile("Scene.js")
evalFile("GameScene.js")
//evalFile("logics/ErrorLogic.js")
//evalFile("logics/VisionLogic.js")
evalFile("corelogics/ReporterLogic.js")
evalFile("corelogics/ArmsLogic.js")
evalFile("corelogics/CombatLogic.js")
evalFile("Commands.js")
evalFile("ItemFactory.js")

function MenuScene(scenehandler,stream)
{
	Scene.call(this,scenehandler,stream)

	stream.putn()
	stream.putn()
	stream.putn("1) New Game")
	stream.putn()
	stream.putn()
}

var _p = MenuScene.prototype

CopyPrototype(Scene,MenuScene)

_p.Tick = function(input)
{
	/*if(!input)
	{
		return
	}*/

	var stream = this.stream
	if(true) //input == "1")
	{
		Game.StartNewGame()
		var c = Game.cdb.Create(CharacterTemplateIds.TomFinkdorf)
		c.SetPlayer(true)
		var room = Game.rdb.GetByName(Game.StartRoomName())
		c.SetRoom(room.ID())
		room.AddCharacter(c.ID())
		c.SetRegion(room.Region())
		c.SetConnection(this.Stream())
		c.SetSceneHandler(this.SceneHandler())
		c.AddLogic(ReporterLogic)
		c.AddLogic(ArmsLogic)
		c.AddLogic(CombatLogic)
		c.AddCommand(GoCommand.name)
		c.AddCommand(ExitCommand.name)
		c.AddCommand(InfoCommand.name)
		c.AddCommand(LookCommand.name)
		c.AddCommand(GetCommand.name)
		c.AddCommand(TalkCommand.name)
		c.AddCommand(InventoryCommand.name)
		c.AddCommand(SayCommand.name)
		c.AddCommand(GiveCommand.name)
		c.AddCommand(DropCommand.name)
		c.AddCommand(TriggerCommand.name)
		c.AddCommand(ArmCommand.name)
		c.AddCommand(DisarmCommand.name)
		c.AddCommand(AttackCommand.name)
		c.AddCommand(BreakCommand.name)
		c.AddCommand(EvalCommand.name)

		var item = Game.idb.Create(ItemTemplateIDs.MediocreCarrot)
		c.AddItem(item.ID())
		var item = Game.idb.Create(ItemTemplateIDs.DamnFineCarrot)
		c.AddItem(item.ID())
		var item = Game.idb.Create(ItemTemplateIDs.DamnFineCarrot)
		c.AddItem(item.ID())
		var item = Game.idb.Create(ItemTemplateIDs.CuriousFrogFigurine)
		c.AddItem(item.ID())


		//this.stream.putn("You are " + c.Name())
		//this.stream.putn("Description: " + c.Description())
		this.SceneHandler().ReplaceCurrentScene(new GameScene(this.SceneHandler(),this.stream,c.ID()))
		Game.DoAction({name:"enterrealm",arg1:c.ID()})
	}
	else
	{
		stream.putn("Unknown choice.")
	}
}



