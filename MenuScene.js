
evalFile("CharacterFactory.js",this)
evalFile("Scene.js")
evalFile("GameScene.js")
evalFile("ErrorLogic.js")
evalFile("VisionLogic.js")
evalFile("Commands.js")

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

		c.AddCommand(GoCommand.name)
		c.AddCommand(ExitCommand.name)
		c.AddCommand(InfoCommand.name)
		c.AddCommand(LookCommand.name)
		c.AddCommand(GetCommand.name)
		c.AddCommand(TalkCommand.name)
		c.AddCommand(InventoryCommand.name)
		c.AddCommand(SayCommand.name)

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



