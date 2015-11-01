
evalFile("./DatabaseInstances.js",this)


function Game()
{
	this.loadpath = ""
	this.savepath = ""
  this.t = 0
  this.rgndb = rgndb
  this.cdb = cdb
}


var _p = Game.prototype = {}


_p.LoadDatabases = function(dir)
{
  rgndb.LoadDirectory(dir)
  rdb.LoadDirectory(dir)
  cdb.LoadDirectory(dir)
}

_p.StartNewGame = function()
{
	this.loaddir = "./newgamestate"
  this.savedir = "./savedgame_VIXEN"

  this.LoadDatabases(this.loadpath)
}



_p.DoCommand = function(cmd,pid)
{

}

_p.AddAction = function()
{

}

_p.AddActionAbsolute = function()
{

}

_p.tick = function()
{

}

var Game = new Game()
