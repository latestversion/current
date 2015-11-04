
evalFile("CharacterFactory.js",this)
evalFile("Scene.js")
evalFile("GameScene.js")
evalFile("ErrorLogic.js")

function MenuScene(sceneHandler,stream)
{
	Scene.call(this,sceneHandler,stream)

	stream.putn()
	stream.putn()
	stream.putn("1) New Game")
	stream.putn()
	stream.putn()
}

var _p = MenuScene.prototype = {}

CopyPrototype(Scene,MenuScene)

_p.onInput = function(input)
{
	var stream = this.stream
		if(input == "1")
		{
			stream.putn("I will start the game")
			Game.StartNewGame()
			var c = Game.cdb.Create(CharacterTemplateIds.TomFinkdorf)
			c.TurnToPlayer()
			c.SetRoom(1)
			c.SetID(77)
			c.SetConnection(this.stream)
			var elogic = new ErrorLogic(c)
			c.AddLogic(elogic)

			Game.cdb.AddEntity(c)
			this.stream.putn("You are " + c.Name())
			this.stream.putn("Description: " + c.Description())
			this.sceneHandler.ReplaceCurrentScene(new GameScene(this.sceneHandler,this.outstream,c.ID()))
		}
		else
		{
			stream.putn("Unknown choice.")
		}
}



