
evalFile("DatabaseInstances.js",this)


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
  console.log("Starting new game")
	this.loaddir = "./newgamestate"
  this.savedir = "./savedgame_VIXEN"

  this.LoadDatabases(this.loaddir)
}



_p.DoCommand = function(input,cid)
{
  var tokens = input.split(" ")
  var cmd = tokens[0]
  var c = cdb.Get(cid)

}

_p.AddAction = function()
{

}

_p.AddActionAbsolute = function()
{

}

_p.tick = function()
{
  // Increment time
  // Check actions
}

var Game = new Game()
