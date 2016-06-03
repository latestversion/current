
evalFile("PhysicalEvent.js")

var _p = Game.prototype

LG_G_DOA = "LG_G_DOA"

_p.DoEnterRealmAction = function(a)
{
  var cid = a.arg1
  var c = Game.Character(a.arg1)
  var r = Game.Room(c.Room())

  if(!c)
  {
    l1("Did not get a valid character from cdb",LG_CMDS)
    return
  }

  if(!r)
  {
    l1("rdb did not return valid room for rid  " + c.Room() + " for cid " + c.ID(),LG_CMDS)
    c.DoAction(new Action("error",0,0,0,0,"You enter the V0iD..."))
    return
  }

  this.DoLookRoomAction({cid:cid})
}


_p.DoMoveAction = function(a)
{
  var direction = a.text
  var cid = a.arg1

  l1("DoMoveAction with action " + JSON.stringify(a),LG_CMDS)

  var character = this.cdb.Get(cid)
  if(!character){l5("No character for cid " + cid,LG_CMDS);return}

  // Get room
  var room = this.rdb.Get(character.Room())
  l1("Room {0} has {1} portals.".format(room.Name(),room.NumPortals()))
  if(!room){l5("No room for rid " + character.Room(),LG_CMDS);return}

  // Find portal with direction
  var pid,portal,r2id

  room.BeginPortals()
  while(pid = room.NextPortal())
  {
    portal = pdb.Get(pid)
    l1("Found portal with name " + portal.Name())
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

  if(!portal.DoAction({name:"attemptenterportal",arg1:cid,text:direction}))
  {
    return
  }

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

  var newroom = room2
  var oldroom = room

  oldroom.DoAction({name:"didleaveroom",arg1:cid})

  portal.DoAction({name:"didenterportal",arg1:cid})
  portal.DoAction({name:"didleaveportal",arg1:cid})

  newroom.DoAction({name:"didenterroom",arg1:cid})

  this.DoActionForCharactersInRoom(newroom,{name:"didenterroom",arg1:cid})
  this.DoActionForItemsInRoom(newroom,{name:"didenterroom",arg1:cid})

  this.DoLookRoomAction({cid:character.ID()})
}


LG_CHK_VISUAL = "LG_CHK_VISUAL"

_p.CheckHasVisual = function(actor,target)
{
  var actorid = actor.ID()
  var targetid = target.ID()
  var room = Game.Room(actor.Room())

  l1("CheckHasVisual: Checking if {0} can see {1} in {2}".format(actor.Name(),target.Name(),room.Name()),LG_CHK_VISUAL)

  var action = {name:"checkvisual",arg1:actorid,arg2:targetid}

  if(!room.DoAction(action))
  {
    l1("CheckHasVisual: The room indicated {0} can not see {1}".format(actor.Name(),target.Name()),LG_CHK_VISUAL)
    return false
  }

  if(!actor.DoAction(action))
  {
    l1("CheckHasVisual: The actor indicated {0} can not see {1}".format(actor.Name(),target.Name()),LG_CHK_VISUAL)
    return false
  }

  if(!target.DoAction(action))
  {
    l1("CheckHasVisual: The target indicated {0} can not see {1}".format(actor.Name(),target.Name()),LG_CHK_VISUAL)
    return false
  }


  return true

}

LG_LK_RM = "LG_LK_RM"

_p.DoLookRoomAction = function(a)
{
  var s = ""
  l1("DoLookRoomAction for cid {0}".format(a.cid),LG_LK_RM)
  var character = cdb.Get(a.cid)
  var actor = character
  if(!character)
  {
    l9("No character for cid {0}".format(a.cid),LG_ACTIONS)
  }
  l1("DoLookRoomAction for character {0}".format(character.Name()),LG_LK_RM)

  var room = rdb.Get(character.Room())
  if(room.DoAction({name:"attemptlookroom",arg1:a.cid,silentcheck:true}))
  {
    s += room.Name() + "\n" + room.Description() + "\n"
  }

  room.BeginCharacters()
  var cid
  while(cid = room.NextCharacter())
  {
    l1("Room ({0},{1}) had a cid {2}".format(room.ID(),room.Name(),cid),LG_SPAM)
    roomchar = cdb.Get(cid)
    l1("Retrieved character {0}".format(roomchar.Name()),LG_SPAM)
    if(roomchar.ID() != character.ID())
    {
      l1("Checking if {0} can see {1}".format(character.Name(),roomchar.Name()),LG_LK_RM)
      if(this.CheckHasVisual(character,roomchar))
      {
        l1("{0} could see {1}".format(character.Name(),roomchar.Name()),LG_LK_RM)
        s += roomchar.Name() + " is here" + "\n"
      }
    }
  }

  room.BeginItems()
  var iid
  while(iid = room.NextItem())
  {
    var item = idb.Get(iid)
    l1("Checking if {0} can see {1}".format(character.Name(),item.Name()),LG_LK_RM)
    if(this.CheckHasVisual(character,item))
    {
      l1("{0} could indeed see {1}".format(character.Name(),item.Name()),LG_LK_RM)
      s += item.Name() + " is here" + "\n"
    }
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


  var matcher = new PartialMatcher(a.text)
  var matchingitems = []

  room.BeginItems()
  var id
  while(id = room.NextItem())
  {
    l1("Room ({0},{1}) had an item {2}".format(room.ID(),room.Name(),id),LG_SPAM)
    var item = idb.Get(id)
    if(matcher.Match(item.Name()))
    {
      matchingitems.push(item)
    }
  }

  l1("The matching items are now " + JSON.stringify(matchingitems),LG_SPAM)

  if(!matchingitems.length)
  {
    charter.DoAction({name:"error",text:"There is no '{0}' here.".format(a.text)})
    return
  }

  var item = matchingitems[0]


  l1("Found a matching item: " + item.Name(),LG_SPAM)
  // Ask permission

  var action = {name:"getitem",arg1:charter.ID(),arg2:item.ID()}

  // Ask room

  if(!room.DoAction(action))
  {
    l1("Room {0} cancelled getitem ".format(room.Name()))
      return
  }

  // Ask all characters

  room.BeginCharacters()
  var tcharter
  while(tcharter = room.NextCharacter())
  {
    tcharter = cdb.Get(tcharter)
    if(!tcharter.DoAction(action))
    {
      l1("Character {0} cancelled getitem ".format(tcharter.Name()))
      return
    }
  }

  // Ask all items

  room.BeginItems()
  var titem
  while(titem = room.NextItem())
  {
    titem = idb.Get(titem)
    if(!titem.DoAction(action))
    {
      l1("Item {0} cancelled getitem ".format(titem.Name()))
      return
    }
  }


  // Transfer ownership
  room.RemoveItem(item.ID())
  charter.AddItem(item.ID())

  // Inform about the event

  charter.DoAction({name:"vision",text:"You pick up " + item.Name()})

  action.name = "didgetitem"

  item.DoAction(action)

  room.DoAction(action)

  room.BeginCharacters()
  var tcharter
  while(tcharter = room.NextCharacter())
  {
    tcharter = cdb.Get(tcharter)
    tcharter.DoAction(action)
  }

  room.BeginItems()
  var titem
  while(titem = room.NextItem())
  {
    titem = idb.Get(titem)
    titem.DoAction(action)
  }

}

_p.DoTalkAction = function(a)
{
  var cid = a.arg1
  var matchstring = a.arg2
  var charter = cdb.Get(cid),talkee
  var room = rdb.Get(charter.Room())

  var charters = this.MatchingCharactersInRoom(room,matchstring)

  talkee = charters.shift()

  if(!talkee)
  {
    charter.DoAction({name:"error",text:"There is no one here with that name to talk to."})
    return
  }

  if(talkee.DoAction({name:"query",text:"cantalk",arg1:cid}))
  {
    charter.DoAction({name:"error",text:talkee.Name() + " does not seem like the talkative type."})
    return
  }

  talkee.DoAction({name:"talk",arg1:cid})
}

_p.DoSayAction = function(a)
{

  var cid = a.arg1
  var message = a.text
  if('undefined' != typeof a.text.join)
  {
    message = a.text.join(" ")
  }

  l1("DoSayAction for cid {0} and message {1}".format(a.cid,message))


  var charter = cdb.Get(cid)
  var template = "{0} say{1}: '{2}'"

  var room = rdb.Get(charter.Room())

  l1("Charter {0} wants to say '{1}' in room '{2}'".format(charter.Name(),message,room.Name()))

  var s = template.format(charter.Name(),"s",message)
  l1("Message: " + s)

  var action = {name:"vision",arg1:cid,text:s}

  room.BeginCharacters()
  var tcid
  while(tcid = room.NextCharacter())
  {
    if(tcid != cid)
    {

      tcharter = cdb.Get(tcid)
      l1("Sending info to {0} ".format(tcharter.Name()))
      tcharter.DoAction(action)
    }
  }

  action.text = template.format("You","",message)

  l1("Informing {0} that: {1}".format(charter.Name(),action.text))
  charter.DoAction(action)
}

_p.DoLookAction = function(a)
{
  var fncnme = "DoLookAction: "
  var lookerid = a.arg1
  var args = a.text
  
  l1(fncnme + "cid {0}, args {1}".format(lookerid,args)) 

  var looker = Game.Entity(lookerid)
  
  // Items in inventory

  var matches = this.MatchingItemsForCharter(looker,args)
  if(matches.length)
  {
    looker.DoAction({name:"info",text:"{0}: {1}".format(matches[0].Name(),matches[0].Description())})
    return
  }

  // Charters in room
  var room = rdb.Get(looker.Room())
  var matches = this.MatchingCharactersInRoom(room,args)
  var receiver
  if(matches.length)
  {
    looker.DoAction({name:"info",text:"{0}: {1}".format(matches[0].Name(),matches[0].Description())})
    return
  }

  // Items in room
  matches = this.MatchingItemsInRoom(room,args)
  if(matches.length)
  {
    looker.DoAction({name:"info",text:"{0}: {1}".format(matches[0].Name(),matches[0].Description())})
    return 
  }

}

_p.DoGiveItemAction = function(a)
{
  var fncnme = "DoGiveItemAction: "
  var cid = a.arg1
  var quantity = a.arg2
  var itemname = a.arg3
  var receivername = a.arg4

  l1(fncnme + "cid {0}, quantity {1}, item {2}, receiver {3}".format(cid,quantity,itemname,receivername))

  var giver = cdb.Get(cid)
  var items = this.MatchingItemsForCharter(giver,itemname)
  l1(fncnme + "Found {0} matching items".format(items.length))
  var item
  if(items.length)
  {
    item = items[0]
  }
  var room = rdb.Get(giver.Room())
  var receivers = this.MatchingCharactersInRoom(room,receivername)
  var receiver
  if(receivers.length)
  {
    receiver = receivers[0]
  }


  if(!giver)
  {
    l5(fncnme + "No giver ")
    return;
  }
  else if (!item)
  {
    giver.DoAction({name:"error",text:"You have no '{0}' in your inventory.".format(itemname)})
    return
  }
  else if(!receiver)
  {
    giver.DoAction({name:"error",text:"You see no '{0}'".format(receivername)})
    return
  }

  l1(fncnme + "giver {0}, item {1}, receiver {2}".format(giver.Name(),item.Name(),receiver.Name()))

  var action = {name:"attemptgiveitem",arg1:giver.ID(),arg2:item.ID(),arg3:receiver.ID()}

  if(!giver.DoAction(action) || !item.DoAction(action) || !receiver.DoAction(action) || !room.DoAction(action))
  {
    return
  }

  giver.RemoveItem(item.ID())
  receiver.AddItem(item.ID())

  var action = {name:"didgiveitem",arg1:giver.ID(),arg2:item.ID(),arg3:receiver.ID()}

  giver.DoAction(action)
  receiver.DoAction(action)
  room.DoAction(action)

  giver.DoAction({name:"vision",text:"You give {0} {1}.".format(receiver.Name(),item.Name())})
  receiver.DoAction({name:"vision",text:"{0} hands you {1}.".format(giver.Name(),item.Name())})
}

_p.DoDropItemAction = function(a)
{
  var cid = a.arg1
  var itemname = a.text

  l1("DoDropItemAction: cid: {0}, itemname: {1}".format(cid,itemname))

  var charter = cdb.Get(cid)
  var room = rdb.Get(charter.Room())
  var matchingitems = this.MatchingItemsForCharter(charter,itemname)

  l1("DoDropItemAction: character: {0}, num items: {1}".format(charter.Name(),matchingitems.length))

  var item

  if(!matchingitems.length)
  {
    charter.DoAction({name:"error",text:"You don't seem to have any '{0}'.".format(itemname)})
    return
  }

  item = matchingitems[0]

  var action = {name:"attemptdropitem",arg1:cid,arg2:item.ID(),arg3:room.ID()}


  if(!room.DoAction(action))
  {
    l1("{0} disallowed {1} drop of {2}".format(room.Name(),charter.Name(),item.Name()))
    return
  }

  // Ask item
  if(!item.DoAction(action))
  {
    l1("{0} disallowed {1} drop of {2}".format(item.Name(),charter.Name(),item.Name()))
    return
  }

  if(!charter.DoAction(action))
  {
    l1("{0} disallowed {1} drop of {2}".format(charter.Name(),charter.Name(),item.Name()))
    return
  }

  charter.RemoveItem(item.ID())
  room.AddItem(item.ID())

  action.name = "diddropitem"

  room.DoAction(action)
  item.DoAction(action)
  charter.DoAction(action)

  charter.DoAction({name:"error",text:"You drop {0} to the ground.".format(item.Name())})
}


_p.DoMessageLogicAction = function(a)
{
  l1("DoMessageLogicAction: ".format(JSON.stringify(a)))

  var typeenum = a.arg1
  var id = a.arg2

  var entity
  if(!(entity = this.GetEntity(id)))
  {
    l5("DoMessageLogicAction: No entity for " + typeenum + ", " + id)
    return
  }

  entity.DoAction(a)
}


_p.DoEventAction = function(a)
{
  l1("DoEventAction: ".format(JSON.stringify(a)))

  var rid = a.arg1
  var room = Game.Room(rid)

  this.DoActionForCharactersInRoom(room,a)
  this.DoActionForItemsInRoom(room,a)
  this.DoActionForPortalsInRoom(room,a)
}

_p.DoPhysicalEventAction = function(a)
{
  l1("DoPhysicalEventAction: ".format(JSON.stringify(a)))

  var purevisual = a.purevisual ? true : false

  var rid = a.arg1
  var room = Game.Room(rid)

  l1("Physical event action in room " + room.Name())

  var targetids = a.targets ? a.targets.slice(0) : room.Characters().slice(0)

  l1("Physical event targets: " + targetids)

  var actorids = a.actors ? a.actors : []

  l1("Physical event actors: " + actorids)

  for(var k in actorids)
  {
    var aid = actorids[k]
    var idx = targetids.indexOf(aid)
    if(-1 != idx)
    {
      targetids.splice(idx,1)
    }
  }

  l1("Physical event targets after actors pruned: " + targetids)


  var actors = Game.EntitiesForIDs(actorids)
  var targets = Game.EntitiesForIDs(targetids)

  l1("Physical event num actors: " + actors.length)
  l1("Physical event num targets: " + targets.length)

  // Check how each target sees the actors
  // If a target sees 0 actors and event is purely visual, the event is missed
  for (var targetidx = 0; targetidx < targets.length; targetidx++)
  {
    var hasvisibleactors = false
    var currenttarget = targets[targetidx]

    if(actors.length)
    {
      for (var actoridx = 0; actoridx < actors.length; actoridx++)
      {
        l1("Checking ")
        var currentactor = actors[actoridx]
        l1("Checking currnet actor / target : {0}/{1}".format(currenttarget.Name(),currentactor.Name()) )
        if(this.CheckHasVisual(currenttarget,currentactor))
        {
          hasvisibleactors = true
        }
        else
        {
          // Replace actor with grammatical entity unknown ("someone", "something", etc)
        }
      }
    }
    else // No explicit actors - Check against general room sight
    {
      l1("No actors given, let's check if the room is a visible area to the target")
      var action = {name:"attemptlookroom",arg1:currenttarget.ID(),mute:true}
      if(room.DoAction(action))
      {
        hasvisibleactors = true
      }
    }

    if(hasvisibleactors || !purevisual)
    {
      currenttarget.DoAction({name:"info",text:a.text})
    }
  }


  // No targets -> Tell all except actors
  // No actors -> Just, ehm, go with it. Check target hasvisual vs room.

  // Actors are always excluded from receving the event

  var actorids = a.actors

  // If no actors just check hasvisual vs room

}

_p.DoDoAction = function(a)
{
  l1("DoDoAction: Entity ID: " + a.arg1)
  var entity = Game.Entity(a.arg1)
  entity.DoAction(a)
}


_p.DoDestroyCharacterAction = function(a)
{
  // This is just for "pointer" reasons, not for game logic and fun trigger action stuff
  l1("DoDoAction: Entity ID: " + a.arg1)
  var charter = Game.Entity(a.arg1)
  var a = {name:"destroy"}
  charter.DoAction(a)
  charter.BeginItems()
  var id
  while(id = charter.NextItem())
  {
    var item = Game.Item(id)
    item.DoAction(a)
    Game.idb.Remove(item.ID())
  }
  var room = Game.Room(charter.Room())
  room.RemoveCharacter(charter.ID())
  Game.cdb.Remove(charter.ID())
}


_p.DoDeathTransportAction = function(a)
{
  var charter = Game.Character(a.arg1)
  if(!charter.IsPlayer())
  {
    Game.DoAction(new Action("destroycharacter",charter.ID()),0)
    return
  }

  var room = Game.Room(charter.Room())
  var region = Game.Region(room.Region())

  if(charter.DoAction(a))
  {
    if(room.DoAction(a))
    {
      if(region.DoAction(a))
      {
        charter.SetAttribute("hitpoints",0.7 * charter.GetAttribute("maxhitpoints"))
        charter.SetRoom(Game.rdb.GetByName(Game.StartRoomName()))
        charter.DoAction({name:"info",text:"You slowly regain consciousness..."})
        Game.DoAction({name:"enterrealm",arg1:charter.ID()})
      }
    }
  }
}

_p.DoHelpAction = function(a)
{
  var charter = Game.Entity(a.arg1)
  if(!charter.IsPlayer())
  {
    return
  }

  var iter = charter.CommandsIterator()
  var cmd
  var text = ""
  while (cmd = iter.Next())
  {
    var aliasiter = cmd.AliasIterator()
    var aliastext = ""
    var alias
    while(alias = aliasiter.Next())
    {
      if(aliastext.length > 0)
      {
        aliastext += "/"
      }
      aliastext += alias.Name()
    }
    aliastext = aliastext.length > 0 ? " ({0}) ".format(aliastext):" "
    text += "{0}{1}- {2}\n".format(cmd.Name(),aliastext, cmd.Description(),aliastext)
  }

  charter.DoAction({name:"info",text:text})
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

  if("talk" == a.name)
  {
    this.DoTalkAction(a)
  }

  if("say" == a.name)
  {
    this.DoSayAction(a)
  }

  if("giveitem" == a.name)
  {
    this.DoGiveItemAction(a)
  }

  if("dropitem" == a.name)
  {
    this.DoDropItemAction(a)
  }

  if("messagelogic" == a.name)
  {
    this.DoMessageLogicAction(a)
  }

  if("event" == a.name)
  {
    this.DoEventAction(a)
  }

  if("physicalevent" == a.name)
  {
    this.DoPhysicalEventAction(a)
  }

  if("do" == a.name)
  {
    this.DoDoAction(a)
  }

  if("destroycharacter" == a.name)
  {
    this.DoDestroyCharacterAction(a)
  }

  if("deathtransport" == a.name)
  {
    this.DoDeathTransportAction(a)
  }

  if("help" == a.name)
  {
    this.DoHelpAction(a)
  }

  if("look" == a.name)
  {
    this.DoLookAction(a)
  }


}
