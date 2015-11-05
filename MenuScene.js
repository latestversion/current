
evalFile("CharacterFactory.js",this)
evalFile("Scene.js")
evalFile("GameScene.js")
evalFile("ErrorLogic.js")

function MenuScene(scenehandler,stream)
{
	Scene.call(this,scenehandler,stream)

	stream.putn()
	stream.putn()
	stream.putn("1) New Game")
	stream.putn()
	stream.putn()
}

var _p = MenuScene.prototype = {}

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
		c.SetID(77)
		c.SetConnection(this.stream)
		var logic = new ErrorLogic(c)
		c.AddLogic(logic)

		Game.cdb.AddEntity(c)
		this.stream.putn("You are " + c.Name())
		this.stream.putn("Description: " + c.Description())
		this.SceneHandler().ReplaceCurrentScene(new GameScene(this.SceneHandler(),this.outstream,c.ID()))
	}
	else
	{
		stream.putn("Unknown choice.")
	}
}



