
evalFile("DatabaseInstances.js",this)
evalFile("ProduceNewGameState.js",this)


function Game()
{
  DatabaseInstanceBearer.call(this)

	this.loadpath = ""
	this.savepath = ""
  this.t = 0

  this.startRoom = 1

  this.dbs = dbinstances

  ProduceNewGameState(this.dbs,"./newgamestate")
}


var _p = Game.prototype = {}


_p.LoadDatabases = function(dir)
{
  for(var k in this.dbs)
  {
    this.dbs[k].LoadDirectory(dir)
  }
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
  l("Game.DoCommand: cmdname: " + cmdname)
  if(c.HasCommand(cmdname))
  {
    var cmd = c.GetCommand(cmdname)
    console.log("had command")
  }
  else
  {
    c.DoAction(new Action("error",0,0,0,"I did not recognize command " + cmdname))
    l(c.logics)
  }
}

_p.DoAction = function(a)
{
  if("enterrealm" == a.name)
  {
    var cid = a.arg1
    var c = cdb.Get(a.arg1)
    var r = rdb.Get(c.Room())

    if(!c)
    {
      le("Did not get a valid character from cdb")
      return
    }

    if(!r)
    {
      le("rdb did not return valid room for rid  " + c.Room() + " for cid " + c.ID())
      c.DoAction(new Action("error",0,0,0,"You enter the V0iD..."))
      return
    }

    c.DoAction({name:"vision",text:r.Name() + "\n" + r.Description()})

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
