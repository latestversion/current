
evalFile("./DatabaseInstances.js",this)


function Game()
{
	this.loadpath = ""
	this.savepath = ""
}


var _p = Game.prototype = {}


_p.StartNewGame = function()
{
	this.loadpath = "./newgame/"
	
}

var Game = new Game()
