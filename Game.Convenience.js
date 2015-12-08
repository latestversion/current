
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

_p.DoActionForCharactersInRoom = function(room,action)
{
  room.BeginCharacters()
  var tcharter
  while(tcharter = room.NextCharacter())
  {
    tcharter = Game.Character(tcharter)
    tcharter.DoAction(action)
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

  return charter
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
