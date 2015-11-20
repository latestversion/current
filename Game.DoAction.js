var _p = Game.prototype


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
    l1("Character {0} cancelled getitem ".format(room.Name()))
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

_p.DoRepeatedBroadcastAction = function(a)
{
  l1("Simulation Time is now " + Game.Time(),LG_SPAM)
  this.AddAction(a,4000)
}

_p.DoActionForCharactersInRoom = function(room,action)
{
  room.BeginCharacters()
  var tcharter
  while(tcharter = room.NextCharacter())
  {
    tcharter = cdb.Get(tcharter)
    tcharter.DoAction(action)
  }
}

_p.DoActionForItemsInRoom = function(room,action)
{
  room.BeginItems()
  var titem
  while(titem = room.NextItem())
  {
    titem = idb.Get(titem)
    titem.DoAction(action)
  }
}

_p.MatchingCharactersInRoom = function(room,matchstring)
{
  var filteredcharters = []
  var matcher = new PartialMatcher(matchstring)
  room.BeginCharacters()
  var charter
  while(charter = room.NextCharacter())
  {
    charter = cdb.Get(charter)
    if(matcher.Match(charter.Name()))
    {
      filteredcharters.push(charter)
    }
  }
  return filteredcharters
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
  l1("DoSayAction for cid {0} and message {1}".format(a.cid,message))
  var cid = a.arg1
  var message = a.text
  if('undefined' != typeof a.text.join)
  {
    message = a.text.join(" ")
  }
  

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

  if("talk" == a.name)
  {
    this.DoTalkAction(a)
  }

  if("say" == a.name)
  {
    this.DoSayAction(a)
  }
}
