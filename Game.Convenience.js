
_p.GetEntity = function(typeenum,id)
{
  var entity
  var db
  switch(typeenum)
  {
    case TypeEnums.Character:
      db = Game.cdb
    break
    case TypeEnums.Item:
      db = Game.idb
    break
    case TypeEnums.Portal:
      db = Game.pdb
    break
    case TypeEnums.Room:
      db = Game.rdb
    break
    default:
      l5("GetEntity: Did not find (typeenum,id): ({0},{1})".format(typeenum,id))
    break
  }

  if(db)
  {
    return db.Get(id)
  }

  return undefined
}

_p.Char = function(cid)
{
  return this.cdb.Get(id)
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


_p.ItemsForCharter = function(charter)
{
  l1("Searching among " + charter.NumItems() + " items for charter " + charter.Name())
  var items = []
  charter.BeginItems()
  var titem
  while(titem = charter.NextItem())
  {
    titem = idb.Get(titem)
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
    l1("next item was: " + titem)
    titem = idb.Get(titem)
    items.push(titem)
  }

  l1("ItemsForEntity: Item {0} had {1} items".format(e.Name(),items.length))

  return items
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
