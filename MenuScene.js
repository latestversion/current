
evalFile("CharacterFactory.js",this)
evalFile("Scene.js")
evalFile("GameScene.js")
evalFile("ErrorLogic.js")
evalFile("VisionLogic.js")

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
		stream.putn("I will start the game")
		Game.StartNewGame()
		var c = Game.cdb.Create(CharacterTemplateIds.TomFinkdorf)
		c.SetPlayer(true)
		c.SetRoom(1)
		var room = rdb.Get(1)
		room.AddCharacter(c.ID())
		c.SetRegion(room.Region())
		c.SetConnection(this.Stream())
		c.SetSceneHandler(this.SceneHandler())

		//var logic = new ErrorLogic(c.ID())
		//c.AddExistingLogic(logic)
		c.AddLogic(ErrorLogic.name)
		//logic = new VisionLogic(c.ID())
		//c.AddExistingLogic(logic)
		c.AddLogic(VisionLogic.name)

		c.AddCommand(CommandNames.Go)
		c.AddCommand(CommandNames.Exit)
		c.AddCommand(CommandNames.Info)
		c.AddCommand(CommandNames.Look)
		c.AddCommand(CommandNames.Get)
		c.AddCommand(CommandNames.Talk)
		c.AddCommand(CommandNames.Inventory)
		c.AddCommand(CommandNames.Say)

		this.stream.putn("You are " + c.Name())
		this.stream.putn("Description: " + c.Description())
		this.SceneHandler().ReplaceCurrentScene(new GameScene(this.SceneHandler(),this.stream,c.ID()))
		Game.DoAction({name:"enterrealm",arg1:c.ID()})
	}
	else
	{
		stream.putn("Unknown choice.")
	}
}



