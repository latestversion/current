
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
	if(!input)
	{
		return
	}

	var stream = this.stream
	if(input == "1")
	{
		stream.putn("I will start the game")
		Game.StartNewGame()
		var c = Game.cdb.Create(CharacterTemplateIds.TomFinkdorf)
		c.SetPlayer(true)
		c.SetRoom(1)
		c.SetID(Game.cdb.GetFreeID())
		var room = rdb.Get(1)
		room.AddCharacter(c.ID())
		c.SetRegion(room.Region())
		c.SetConnection(this.stream)
		var logic = new ErrorLogic(c)
		c.AddLogic(logic)
		logic = new VisionLogic(c.ID())
		c.AddLogic(logic)

		var cmd = new GoCommand(c.ID())
		c.AddCommand(cmd.Name(),cmd)

		cmd = new ExitCommand(c.ID())
		c.AddCommand(cmd.Name(),cmd)

		cmd = new InfoCommand(c.ID())
		c.AddCommand(cmd.Name(),cmd)

		Game.cdb.Add(c)
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



