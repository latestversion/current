evalFile("log.js")
evalFile("String.js")
evalFile("Matchers.js")
evalFile("Enums.js")
evalFile("IDBank.js")
evalFile("Action.js")
evalFile("TimedAction.js")
evalFile("CopyPrototype.js")
evalFile("Entity.js")
evalFile("HasArray.js")
evalFile("HasCharacters.js")
evalFile("HasItems.js")
evalFile("HasPortals.js")
evalFile("HasEntries.js")
evalFile("MenuScene.js")
evalFile("LoginHandler.js")
evalFile("DatabaseInstances.js")
evalFile("SceneHandler.js")
evalFile("DatabaseInstances.js")
evalFile("TickerClock.js")
evalFile("EventScheduler.js")
evalFile("Actions")


LG_STARTUP = "LG_STARTUP"

function Game(mudname)
{
  DatabaseInstanceBearer.call(this)
  TickerClock.call(this)
  EventScheduler.call(this)

  this.mudname = mudname
	this.loadpath = ""
	this.savepath = ""
  this.t = 0
  this.maxdt = 1000
  this.lastTick = 0

  this.startRoomName = "A field of mud"

  this.dbs = dbinstances
}

CopyPrototype(TickerClock,Game)
CopyPrototype(EventScheduler,Game)

var _p = Game.prototype

evalFile("Game.ConsistencyCheckDatabases.js")


_p.MudName = function()
{
  return this.mudname
}

_p.StartRoomName = function()
{
  return this.startRoomName
}

_p.LoadDatabases = function(dir,purge)
{
  for(var k in this.dbs)
  {
    this.dbs[k].LoadDirectory(dir,purge)
  }
}

_p.SendWorldStartEvent = function()
{
  // Send to regions only for now

  this.rgndb.Begin()

  var region
  while (region = rgndb.Next())
  {
    var a = new WorldDidStartAction()
    region.DoAction(a)
    l1("worldstartevent to region" + region.Name(),LG_STARTUP)
  }
}

_p.StartNewGame = function()
{
  l1("Starting new game",LG_STARTUP)
  evalFile(this.MudName() + "/ProduceNewGameState")
  ProduceNewGameState(this.dbs,"./" + this.MudName() + "/newgamestate")
	this.loaddir = "./" + this.MudName() + "/newgamestate"
  this.savedir = "./savedgame_VIXEN"

  var purge = true
  this.LoadDatabases(this.loaddir,purge)
  l1("Loaded databases",LG_STARTUP)
  this.ConsistencyCheckDatabases(this.dbs,true)
  l1("Consistency checked databases",LG_STARTUP)
  this.SendWorldStartEvent()
}


_p.DoCommand = function(input,cid)
{

  if("\n" == input)
  {
    return
  }

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
    cmd.Execute(args,c) // args is an array
    return
  }

  // Check for aliases
  var iter = c.CommandsIterator()
  var command
  while(command = iter.Next())
  {
    if(command.HasAliasName(cmdname))
    {
      l1("Found alias " + cmdname)
      var aliasdescription = command.AliasDescription(cmdname)
      l1("Alias description: " + aliasdescription)
      var newargs = aliasdescription.split(" ")
      var cmdname = newargs.shift()
      var length = newargs.length
      while(length)
      {
        args.unshift(newargs.pop())
        length--
      }

      if(c.HasCommand(cmdname))
      {
        var cmd = c.GetCommand(cmdname)
        l1("had command " + cmdname,LG_CMDS)
        cmd.Execute(args,c)
        return
      }
    }
  }


  l5(c.Name() + " did not have command " + cmdname,LG_CMDS)


  c.DoAction(new Action("error",0,0,0,0,"I did not recognize command " + cmdname))

}

evalFile("Game.Convenience.js")
evalFile("Game.DoAction.js")


_p.AddAction = function(action,timeoffset)
{
  var schedtime = this.Time() + timeoffset
  l1("Adding action " + action.name + " sched for time " + schedtime,LG_ACTIONS)
  var timedaction = new TimedAction(action,schedtime)
  this.AddEvent(timedaction)
  return timedaction.ID()
}

_p.AddActionAbsolute = function(action,absolutetime)
{
  l1("Adding absolute action " + action.name + " sched for time " + absolutetime,LG_ACTIONS)
  var timedaction = new TimedAction(action,absolutetime)
  this.AddEvent(timedaction)
  return timedaction.ID()
}

_p.Tick = function()
{
  this.TickTime()

  var timedaction
  // Not retrieving all passed events at once since some of them might be canceled due to character terminal illness etc
  while(timedaction = this.GetFirstPassedEvent(this.Time()))
  {
    l1("Timed action: id, action name: {0},{1}".format(timedaction.ID(),timedaction.Action().name),LG_ACTIONS)
    this.DoAction(timedaction.Action())
  }
}

