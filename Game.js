
evalFile("./DatabaseInstances.js",this)


function Game()
{
	this.loadpath = ""
	this.savepath = ""
}


var _p = Game.prototype = {}


_p.LoadGame(dir)
{
  idb.LoadDir(dir)
  rgndb.LoadDir(dir)
  rdb.LoadDir(dir)
  cdb.LoadDir(dir)
}

_p.StartNewGame = function()
{
	this.loaddir = "./newgamestate"
  this.savedir = "./savedgame_VIXEN"

  this.LoadGame(this.loadpath)

}

var Game = new Game()
