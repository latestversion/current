
evalFile("DatabaseInstances.js",this)
evalFile("ProduceNewGameState.js",this)
evalFile("TickerClock.js",this)
evalFile("EventScheduler.js",this)


function Game()
{
  DatabaseInstanceBearer.call(this)
  TickerClock.call(this)
  EventScheduler.call(this)

	this.loadpath = ""
	this.savepath = ""
  this.t = 0
  this.maxdt = 1000
  this.lastTick = 0

  this.startRoom = 1

  this.dbs = dbinstances

  ProduceNewGameState(this.dbs,"./newgamestate")
}


var _p = Game.prototype

CopyPrototype(TickerClock,Game)
CopyPrototype(EventScheduler,Game)

_p.ConsistencyCheckDatabases = function(dbs,addmissing)
{
  l1("Consistency check databases",LG_DB_CHECK)

  var idb = dbs[TypeEnums.Item]
  var cdb = dbs[TypeEnums.Character]
  var rdb = dbs[TypeEnums.Room]
  var rgndb = dbs[TypeEnums.Region]
  var pdb = dbs[TypeEnums.Portal]

  l1(dbs.length + " databases provided",LG_DB_CHECK)

  // Rooms
  l5("Checking " + rdb.Size() + " rooms")
  var riter = rdb.Iterator()
  var room
  while(room = riter.Next())
  {
    var rid = room.ID()
    var rgnid = room.Region()
    var region = rgndb.Get(rgnid)
    if(!region)
    {
      l7("No region for id " + rgnid)
      throw("Fatal error no room for id " + rgnid)
    }
    if(!region.HasRoom(rid))
    {
      l7("'" + room.Name()  + "' not in region '" +  region.Name() + "'")
      if(addmissing)
      {
        region.AddRoom(rid)
        l1("'" + room.Name()  + "' added to region '" +  region.Name() + "'")
      }
    }
  }


}

_p.LoadDatabases = function(dir)
{
  for(var k in this.dbs)
  {
    this.dbs[k].LoadDirectory(dir)
  }
}

_p.StartNewGame = function()
{
  l1("Starting new game")
	this.loaddir = "./newgamestate"
  this.savedir = "./savedgame_VIXEN"

  var purge = true
  this.LoadDatabases(this.loaddir,purge)
  this.ConsistencyCheckDatabases(this.dbs,true)
}


_p.DoCommand = function(input,cid)
{
  var args = input.split(" ")
  var cmdname = args.shift()
  var c = this.cdb.Get(cid)

  if(!c)
  {
    l5("Could not find character " + cid,LG_CMDS)
    return
  }

  l1("Game.DoCommand: " + cmdname + " for character " + c.Name(),LG_SPAM)
  
  if(c.HasCommand(cmdname))
  {
    var cmd = c.GetCommand(cmdname)
    l1("had command " + cmdname,LG_CMDS)
    cmd.Execute(args,c)
  }
  else
  {
    l5(c.Name() + " did not have command " + cmdname,LG_CMDS)
    c.DoAction(new Action("error",0,0,0,"I did not recognize command " + cmdname))
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

_p.AddAction = function(action,timeoffset)
{
  var schedtime = this.Time()+timeoffset
  l1("Adding action " + action.Name() + " sched for time " + schedtime,LG_ACTIONS)
  action.SetTimestamp(schedtime)
  this.AddEvent(action)
}

_p.AddActionAbsolute = function(action,absolutetime)
{
  l1("Adding absolute action " + action.Name() + " sched for time " + absolutetime,LG_ACTIONS)
  action.SetTimestamp(absolutetime)
  this.AddEvent(action)
}

_p.Tick = function()
{
  this.TickTime()

  var actions = this.GetPassedEvents(this.Time())
  if(actions.length)
  {
    l1("I have " + actions.length + " actions to carry out",LG_ACTIONS)
  }

  // Check actions
}

var Game = new Game()


