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

MenuHandler.temp = 0
MenuHandler.GetUserNameState = MenuHandler.temp++
MenuHandler.CheckUserNameState = MenuHandler.temp++
MenuHandler.GetPassState = MenuHandler.temp++
MenuHandler.CheckPassState = MenuHandler.temp++

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
		}
		else
		{
			stream.putn("Unknown choice.")
		}
	}
}



