
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
  l1("Checking " + rdb.Size() + " rooms",LG_DB_CHECK)
  var riter = rdb.Iterator()
  var room
  while(room = riter.Next())
  {
    var rid = room.ID()
    var rgnid = room.Region()
    var region = rgndb.Get(rgnid)
    if(!region)
    {
      l9("No region for id " + rgnid)
      throw("Fatal error no region for id " + rgnid)
    }
    if(!region.HasRoom(rid))
    {
      l9("'" + room.Name()  + "' not in region '" +  region.Name() + "'")
      if(addmissing)
      {
        region.AddRoom(rid)
        l1("'" + room.Name()  + "' added to region '" +  region.Name() + "'")
      }
    }
  }

  // Portals found in rooms
  l1("Checking " + pdb.Size() + " portals",LG_DB_CHECK)
  
  var portal, entry, pid
  pdb.Start()
  while(portal = pdb.Next())
  {
    pid = portal.ID()
    l1("pid " + pid + " has " + portal.NumEntries() + " entries",LG_DB_CHECK)
    
    portal.BeginEntries()

    while(entry = portal.NextEntry())
    {
      l1("entry " + JSON.stringify(entry),LG_SPAM)
      if(!entry)
      {throw "wtf no entry " + JSON.stringify(entry)}
      var room = rdb.Get(entry.StartRoom())
      if(!room.HasPortal(pid))
      {
        l9("Portal pid " + pid + " not in room '" + room.Name() + "'")
        if(addmissing)
        {
          room.AddPortal(pid)
          l1("'" + pid  + "' added to room '" +  room.Name() + "'")
        }
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


_p.DoEnterRealmAction = function(a)
{
  var cid = a.arg1
  var c = cdb.Get(a.arg1)
  var r = rdb.Get(c.Room())

  if(!c)
  {
    l1("Did not get a valid character from cdb",LG_CMDS)
    return
  }

  if(!r)
  {
    l1("rdb did not return valid room for rid  " + c.Room() + " for cid " + c.ID(),LG_CMDS)
    c.DoAction(new Action("error",0,0,0,"You enter the V0iD..."))
    return
  }

  c.DoAction({name:"vision",text:r.Name() + "\n" + r.Description()})
}


_p.DoMoveAction = function(a)
{
  // "move" arg1 = cid, text = direction

  var direction = a.text
  var cid = a.arg1

  l1("DoMoveAction with action " + JSON.stringify(a),LG_CMDS)

  var character = this.cdb.Get(cid)
  if(!character){l5("No character for cid " + cid,LG_CMDS);return}
  
  // Get room
  var room = this.rdb.Get(character.Room())
  if(!room){l5("No room for rid " + character.GetRoom(),LG_CMDS);return}
  
  // Find portal with direction
  var pid,portal

  room.BeginPortals()
  while(pid = room.NextPortal())
  {
    portal = pdb.Get(pid)
    if(!portal){l5("No portal for pid " + pid,LG_CMDS);return}

    if(portal.HasEntryForRoomAndDirection(rid,direction))
    {
      break
    }
  }

  if(!portal)
  {
    l1("No portal found for direction " + direction,LG_SPAM)
    character.DoAction({name:"error",text:"It's impossible to go that way."})
    return
  }

  character.DoAction({name:"error",text:"Found portal! Next up: Actually going that way!"})

}



_p.DoAction = function(a)
{

  l1("e Game.DoAction with action " + a,LG_SPAM)

  if("enterrealm" == a.name)
  {
    this.DoEnterRealmAction(a) 
  }

  if("move" == a.name)
  {
    this.DoMoveAction(a)
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


