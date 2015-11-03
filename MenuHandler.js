
evalFile("CharacterFactory.js",this)

function MenuHandler(manager,outstream)
{
	this.manager = manager
	this.stream = outstream

	stream.putn()
	stream.putn()
	stream.putn("1) New Game")
	stream.putn()
	stream.putn()
}

var _p = MenuHandler.prototype = {}

_p.onInput = function(input)
{
		if(input == "1")
		{
			stream.putn("I will start the game")
			Game.StartNewGame()
			var c = Game.cdb.Create(CharacterTemplateIds.TomFinkdorf)
			c.TurnToPlayer()
			c.SetRoom(1)
			c.SetId(77)
			c.SetConnection(this.stream)
			this.stream.putn("You are " + c.Name())
			this.stream.putn("Description: " + c.Description())
			this.manager.setCurrentHandler(new GameHandler(this.manager,this.outstream)
		}
		else
		{
			stream.putn("Unknown choice.")
		}
}



