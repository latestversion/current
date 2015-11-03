
evalFile("CharacterFactory.js",this)

function MenuHandler(stream)
{
	this.stream = stream
	this.state = 0

	stream.putn()
	stream.putn()
	stream.putn("1) New Game")
	stream.putn()
	stream.putn()
}

var _p = MenuHandler.prototype = {}

_p.tick = function()
{
	var stream = this.stream
	var input = this.stream.get()

	if(input)
	{
		if(input == "1")
		{
			stream.putn("I will start the game")
			Game.StartNewGame()
			var c = Game.cdb.Create(CharacterTemplateIds.TomFinkdorf)
			c.TurnToPlayer()
			c.SetRoom(1)
			c.SetConnection(this.stream)
			this.stream.putn("You are " + c.Name())
			this.stream.putn("Description: " + c.Description())
		}
		else
		{
			stream.putn("Unknown choice.")
		}
	}
}



