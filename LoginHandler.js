function LoginHandler(stream)
{
	this.stream = stream
	this.state = 0

	stream.putn()
	stream.putn()
	stream.putn("MM     MM  EEEEE   H  H")
	stream.putn("M M   M M  E       H  H")
	stream.putn("M  M M  M  EEE     HHHH")
	stream.putn("M   M   M  E       H  H")
	stream.putn("M       M  EEEEE   H  H")
	stream.putn()
	stream.putn("Welcome to the forgotten realms!")
	stream.putn()
	stream.putn("Adventure awaits. IF you are strong enough!")
	stream.putn("MUAHHAAaa....")
	stream.putn()
	stream.putn()
}

LoginHandler.temp = 0
LoginHandler.GetUserNameState = LoginHandler.temp++
LoginHandler.CheckUserNameState = LoginHandler.temp++
LoginHandler.GetPassState = LoginHandler.temp++
LoginHandler.CheckPassState = LoginHandler.temp++

var _p = LoginHandler.prototype = {}

_p.tick = function()
{
	var stream = this.stream
	var input = this.stream.get()

	switch(this.state)
	{
		case LoginHandler.GetUserNameState:
			stream.putn("Please provide a username.")
			this.state++
		break;
		case LoginHandler.CheckUserNameState:
			if(!input){return}
			stream.putn("You choose username '" + input + "'")
			stream.putn()
			stream.putn()
			this.state++
		break;
		case LoginHandler.GetPassState:
			stream.putn("Input password. Please.")
			this.state++
		break;
		case LoginHandler.CheckPassState:
			if(!input){return}
			if(input.length < 10)
			{
				stream.putn("LOL that password SUCKS!!")
				this.state = LoginHandler.GetUserNameState
			}
			else
			{
				stream.putn("Okay that was a good pass.")
				this.state++
			}
		break;
		default:
		break;
	}
}



