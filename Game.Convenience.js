
_p.GetEntity = function(id)
{
  var typeenum = IDBank.TypeForID(id)
  var db = this.dbs[typeenum]

  if(db)
  {
    return db.Get(id)
  }

  return undefined
}


_p.Entity = function(id)
{
  return this.GetEntity(id)
}

_p.Character = function(cid)
{
  return this.cdb.Get(cid)
}

_p.Item = function(iid)
{
  return this.idb.Get(iid)
}

_p.Portal = function(pid)
{
  return this.pdb.Get(pid)
}

_p.Region = function(rgnid)
{
  return this.rgndb.Get(rgnid)
}

_p.Room = function(rid)
{
  return this.rdb.Get(rid)
}

_p.EntitiesForIDs = function(ids)
{
  var ents = []
  for (var i = 0; i < ids.length; i++)
  {
    ents.push(Game.GetEntity(ids[i]))
  }
  return ents
}

_p.ItemsForCharter = function(charter)
{
  l1("Searching among " + charter.NumItems() + " items for charter " + charter.Name())
  var items = []
  charter.BeginItems()
  var titem
  while(titem = charter.NextItem())
  {
    titem = Game.Item(titem)
    items.push(titem)
  }

  l1("ItemsForCharter: Charter {0} had {1} items".format(charter.Name(),items.length))

  return items
}

_p.ItemsForEntity = function(e)
{
  l1("ItemsForEntity: Searching among " + e.NumItems() + " items for entity" + e.Name())
  var items = []
  e.BeginItems()
  var titem
  while(titem = e.NextItem())
  {
    titem = Game.Item(titem)
    items.push(titem)
  }

  l1("ItemsForEntity: Item {0} had {1} items".format(e.Name(),items.length))

  return items
}


_p.FilterNamedsByString = function(namedsids,matchstring)
{
  l1("Matching {0} nameds against {1}".format(namedsids.length, matchstring))

  var nameds = Game.EntitiesForIDs(namedsids)
  var filterednameds = []

  var matcher = new PartialMatcher(matchstring)

  for(var k = 0; k < nameds.length; k++)
  {
    var named = nameds[k]
    if(matcher.Match(named.Name()))
    {
      filterednameds.push(named)
    }
  }

  return filterednameds
}

_p.MatchingItemsForCharter = function(charter,matchstring)
{
  var items = this.ItemsForCharter(charter)
  var filtereditems = []

  var matcher = new PartialMatcher(matchstring)

  for(var k in items)
  {
    var item = items[k]
    if(matcher.Match(item.Name()))
    {
      filtereditems.push(item)
    }
  }

  return filtereditems
}

_p.DoActionForCharactersInRoom = function(room,action,exceptions)
{
  l1("DoActionForCharactersInRoom")
  room.BeginCharacters()
  var cid
  while(cid = room.NextCharacter())
  {
    if(exceptions && (-1 != exceptions.indexOf(cid)))
    {
      continue
    }

    var charter = Game.Character(cid)
    charter.DoAction(action)
  }
}

_p.DoActionForItemsInRoom = function(room,action)
{
  room.BeginItems()
  var titem
  while(titem = room.NextItem())
  {
    titem = Game.Item(titem)
    titem.DoAction(action)
  }
}

_p.DoActionForPortalsInRoom = function(room,action)
{
  room.BeginPortals()
  var tentity
  while(tentity = room.NextPortal())
  {
    tentity = Game.Portal(tentity)
    tentity.DoAction(action)
  }
}


_p.ChartersInRoom = function(room)
{
  var charters = []
  room.BeginCharacters()
  var charter
  while(charter = room.NextCharacter())
  {
    charters.push(charter)
  }

  return charters
}

_p.DoActionForChartersInRegion = function(action, region, exceptions)
{
  l1("DoActionForChartersInRegion: action: " + JSON.stringify(action),LG_SPAM)
  region.BeginRooms()
  var roomid
  while(roomid = region.NextRoom())
  {
    var room = Game.Room(roomid)

    room.BeginCharacters()
    var cid
    while(cid = room.NextCharacter())
    {
      if(exceptions && (-1 != exceptions.indexOf(cid)))
      {
        continue
      }

      var charter = Game.Character(cid)
      charter.DoAction(action)
    }
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
    charter = Game.Character(charter)
    if(matcher.Match(charter.Name()))
    {
      filteredcharters.push(charter)
    }
  }
  return filteredcharters
}

_p.MatchingItemsInRoom = function(room,matchstring)
{
  var filtereditems = []
  var matcher = new PartialMatcher(matchstring)
  room.BeginItems()
  var itemid
  while(itemid = room.NextItem())
  {
    var item = Game.Item(itemid)
    if(matcher.Match(item.Name()))
    {
      filtereditems.push(item)
    }
  }
  return filtereditems
}

_p.TellPlayers = function(msg)
{
  this.cdb.Begin()
  var charter
  while(charter = this.cdb.Next())
  {
    if(charter.IsPlayer())
    {
      charter.DoAction({name:"info",text:msg})
    }
  }
}
