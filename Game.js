
evalFile("DatabaseInstances.js",this)
evalFile("ProduceNewGameState.js",this)
evalFile("TickerClock.js",this)
evalFile("EventScheduler.js",this)


LG_STARTUP = "LG_STARTUP"

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

  // Items
  l1("Checking {0} items".format(idb.Size()),LG_DB_CHECK)
  idb.Begin()
  var item
  while(item = idb.Next())
  {
    l1("Checking item {0}".format(item.Name()),LG_DB_CHECK)
    if(item.Room())
    {
      var room = rdb.Get(item.Room())
      if(!room.HasItem(item.ID()))
      {
        l9("Item '{0}' not in room '{1}'".format(item.Name(),room.Name()),LG_DB_CHECK)
        if(addmissing)
        {
          l1("Adding {0} to {1}".format(item.Name(),room.Name()),LG_DB_CHECK)
          room.AddItem(item.ID())
        }
      }
    }
  }

  // Characters in rooms
  l1("Checking {0} characters".format(cdb.Size()),LG_DB_CHECK)
  cdb.Begin()
  var charter
  while(charter = cdb.Next())
  {
    var room = rdb.Get(charter.Room())
    if(!room.HasCharacter(charter.ID()))
      {
        l9("Character '{0}' not in room '{1}'".format(charter.Name(),room.Name()),LG_DB_CHECK)
        if(addmissing)
        {
          l1("Adding {0} to {1}".format(charter.Name(),room.Name()),LG_DB_CHECK)
          room.AddCharacter(charter.ID())
        }
      }
  }

  // Rooms
  l1("Checking {0} rooms".format(rdb.Size()),LG_DB_CHECK)
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

_p.LoadDatabases = function(dir,purge)
{
  for(var k in this.dbs)
  {
    this.dbs[k].LoadDirectory(dir,purge)
  }
}

_p.StartNewGame = function()
{
  l1("Starting new game",LG_STARTUP)
	this.loaddir = "./newgamestate"
  this.savedir = "./savedgame_VIXEN"

  var purge = true
  this.LoadDatabases(this.loaddir,purge)
  l1("Loaded databases",LG_STARTUP)
  this.ConsistencyCheckDatabases(this.dbs,true)
  l1("Consistency checked databases",LG_STARTUP)

  this.DoAction({name:"repeatedbroadcast"})
  l1("Started broadcast repat",LG_STARTUP)
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

  this.DoLookRoomAction({cid:cid})
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
  if(!room){l5("No room for rid " + character.Room(),LG_CMDS);return}

  // Find portal with direction
  var pid,portal,r2id

  room.BeginPortals()
  while(pid = room.NextPortal())
  {
    portal = pdb.Get(pid)
    if(!portal){l5("No portal for pid " + pid,LG_CMDS);return}

    r2id = portal.DestinationRoomForStartRoomAndDirection(room.ID(),direction)

    if(r2id)
    {
      break
    }
    r2id = 0
    portal = false
  }

  if(!portal)
  {
    l1("No portal found for direction " + direction,LG_SPAM)
    character.DoAction({name:"error",text:"It's impossible to go that way."})
    return
  }

  room2 = this.rdb.Get(r2id)
  if(!room2){l9("No room for rid " + r2id,LG_CMDS);return}


  // Check if characters in the room allow leaving
  if(room.NumCharacters() > 1)
  {
    room.BeginCharacters()
    var loopid
    while(loopid = room.NextCharacter())
    {
      var charter = cdb.Get(loopid)
      l1("next char: {0},{1} ".format(loopid,charter.Name()),LG_SPAM)
      if(!charter.DoAction({name:"attemptmove",arg1:cid,arg2:TypeEnums.Character,text:direction}))
      {
        l1("Charter {0} did not allow move {1} for {2},{3}".format(charter.Name(),direction,cid,character.Name()),LG_SPAM)
        return
      }
    }
  }

  // Check if items in the room allow leaving
  room.BeginItems()
  var loopid
  while(loopid = room.NextItem())
  {if(loopid == cid)
    l1("next item: {0} ".format(loopid),LG_SPAM)
    var item = idb.Get(loopid)
    if(!item.DoAction({name:"attemptmove",arg1:cid,arg2:TypeEnums.Character,text:direction}))
    {
      l1("Item {0} did not allow move {1} for {2},{3}".format(item.Name(),direction,cid,character.Name()),LG_SPAM)
      return
    }
  }



  l1("All clear to move " + character.Name() + " " + direction,LG_SPAM)
  room.RemoveCharacter(character.ID())
  character.SetRoom(r2id)
  room2.AddCharacter(character.ID())
  l1("{0} now has character {1}".format(room2.Name(),character.Name()),LG_SPAM)
  character.SetRegion(room2.Region())
  l1("Old region {0}, new region {1}".format(room.Region(),room2.Region()),LG_SPAM)

  this.DoLookRoomAction({cid:character.ID()})
}


_p.DoLookRoomAction = function(a)
{
  var s = ""
  l1("DoLookRoomAction for cid {0}".format(a.cid),LG_SPAM)
  var character = cdb.Get(a.cid)
  if(!character)
  {
    l9("No character for cid {0}".format(a.cid),LG_ACTIONS)
  }
  l1("DoLookRoomAction for character {0}".format(character.Name()),LG_SPAM)

  var room = rdb.Get(character.Room())

  s += room.Name() + "\n" + room.Description() + "\n"

  room.BeginCharacters()
  var cid
  while(cid = room.NextCharacter())
  {
    l1("Room ({0},{1}) had a cid {2}".format(room.ID(),room.Name(),cid),LG_SPAM)
    roomchar = cdb.Get(cid)
    l1("Retrieved character {0}".format(roomchar.Name()),LG_SPAM)
    if(roomchar.ID() != character.ID())
    {
      s += roomchar.Name() + " is here" + "\n"
    }
  }

  room.BeginItems()
  var iid
  while(iid = room.NextItem())
  {
    var item = idb.Get(iid)
    s += item.Name() + " is here" + "\n"
  }

  character.DoAction({name:"vision",text:s})
}


_p.DoGetItemAction = function(a)
{
  var cid = a.arg1
  var charter = cdb.Get(cid)
  var room = rdb.Get(charter.Room())

  l1("DoGetItemAction for cid {0}".format(a.arg1),LG_SPAM)
  l1("DoGetItemAction args " + a.text)

  if(!charter)
  {
    l9("No character for cid {0}".format(charter.ID()),LG_ACTIONS)
  }

  room.BeginItems()
  var id
  while(id = room.NextItem())
  {
    l1("Room ({0},{1}) had an item {2}".format(room.ID(),room.Name(),id),LG_SPAM)
    var item = idb.Get(id)
  }

  charter.DoAction({name:"vision",text:"You stretch out your hand to grasp " + a.text + ", but the get function is not yet fully implemented! What a bummer..."})
}

_p.DoRepeatedBroadcastAction = function(a)
{
  l1("Simulation Time is now " + Game.Time(),LG_SPAM)
  this.AddAction(a,4000)
}

_p.DoAction = function(a)
{

  l1("e Game.DoAction with action " + JSON.stringify(a),LG_SPAM)

  if("enterrealm" == a.name)
  {
    this.DoEnterRealmAction(a)
  }

  if("move" == a.name)
  {
    this.DoMoveAction(a)
  }

  if("lookroom" == a.name)
  {
    this.DoLookRoomAction(a)
  }

  if("getitem" == a.name)
  {
    this.DoGetItemAction(a)
  }

  if("repeatedbroadcast" == a.name)
  {
    this.DoRepeatedBroadcastAction(a)
  }
}


_p.AddAction = function(action,timeoffset)
{
  var schedtime = this.Time() + timeoffset
  l1("Adding action " + action.name + " sched for time " + schedtime,LG_ACTIONS)
  var timedaction = new TimedAction(action,schedtime)
  this.AddEvent(timedaction)
}

_p.AddActionAbsolute = function(action,absolutetime)
{
  l1("Adding absolute action " + action.name + " sched for time " + absolutetime,LG_ACTIONS)
  var timedaction = new TimedAction(action,absolutetime)
  this.AddEvent(timedaction)
}

_p.Tick = function()
{
  this.TickTime()

  var timedactions = this.GetPassedEvents(this.Time())
  if(timedactions.length)
  {
    l1("I have " + timedactions.length + " actions to carry out",LG_ACTIONS)
    for (var k in timedactions)
    {
      var a = timedactions[k].Action()
      l1("Timed action: " + JSON.stringify(a),LG_ACTIONS)
      this.DoAction(a)
    }
  }
}

var Game = new Game()


