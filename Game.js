
evalFile("DatabaseInstances.js",this)


function Game()
{
	this.loadpath = ""
	this.savepath = ""
  this.t = 0

  this.startRoom = 1

  this.cdb = cdb
  this.rdb = rdb
  this.rgndb = rgndb
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
  var cmdname = tokens[0]
  var c = cdb.Get(cid)
  if(c.HasCommand(cmdname))
  {
    var cmd = c.GetCommand(cmdname)
    console.log("had command")
  }
  else
  {
    c.DoAction(new Action("error",0,0,0,"I did not recognize command " + cmdname))
  }

}

_p.AddAction = function()
{

}

_p.AddActionAbsolute = function()
{

}

_p.Tick = function()
{
  // Increment time
  // Check actions
}

var Game = new Game()
