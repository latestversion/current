var _p = Game.prototype

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
        if(!addmissing){l9("Item '{0}' not in room '{1}'".format(item.Name(),room.Name()),LG_DB_CHECK)}
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
        if(!addmissing){l9("Character '{0}' not in room '{1}'".format(charter.Name(),room.Name()),LG_DB_CHECK)}
        if(addmissing)
        {
          l1("Adding {0} to {1}".format(charter.Name(),room.Name()),LG_DB_CHECK)
          room.AddCharacter(charter.ID())
        }
      }
  }


  l1("Checking characters' regions",LG_DB_CHECK)
  cdb.Begin()
  var charter
  while(charter = cdb.Next())
  {
    if(!charter.Region())
    {
      l1(charter.Name() + "missing region, assigning to room's region",LG_DB_CHECK)
      var room = rdb.Get(charter.Room())
      charter.SetRegion(room.Region())
    }
  }

  // Rooms
  l1("Checking {0} rooms".format(rdb.Size()),LG_DB_CHECK)
  var riter = rdb.Start()
  var room
  while(room = rdb.Next())
  {
    var rid = room.ID()
    var rgnid = room.Region()
    var region = rgndb.Get(rgnid)
    if(!region)
    {
      l9("Fatal error no region for id " + rgnid)
    }
    if(!region.HasRoom(rid))
    {
      if(!addmissing){l9("'" + room.Name()  + "' not in region '" +  region.Name() + "'")}
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
      {l9("wtf no entry " + JSON.stringify(entry))}
      var room = rdb.Get(entry.StartRoom())
      if(!room.HasPortal(pid))
      {
        if(!addmissing){l9("Portal pid " + pid + " not in room '" + room.Name() + "'")}
        if(addmissing)
        {
          room.AddPortal(pid)
          l1("'" + pid  + "' added to room '" +  room.Name() + "'")
        }
      }
    }
  }

}

//Log.logGroups.push(LG_DB_CHECK)

