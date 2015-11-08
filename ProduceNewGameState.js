
function ProduceNewGameState(dbs,savedir)
{

  var idb = dbs[Item.ENUM]
  var cdb = dbs[Character.ENUM]
  var rdb = dbs[Room.ENUM]
  var rgndb = dbs[Region.ENUM]
  var pdb = dbs[Portal.ENUM]

  // Items

  idb.Purge()
  // Characters
  cdb.Purge()

  // Rooms
  rdb.Purge()

  var id = 1
  var region = 1
  var r = new Room()
  r.SetID(1)
  r.SetName("A field of mud")
  r.SetDescription("So yeah, this is where cabbages come from.")
  r.SetRegion(region)
  rdb.Add(r)

  region = 2
  var r = new Room()
  r.SetID(2)
  r.SetName("Path to scary forest")
  r.SetDescription("A narrow scary path. It leads to the scary forest.")
  r.SetRegion(region)
  rdb.Add(r)

  var r = new Room()
  r.SetID(3)
  r.SetName("Clearing in the forest")
  r.SetDescription("It's a clearing in the forest. The old bones of unfortunate adventurers aside, it's quite cozy.")
  r.SetRegion(region)
  rdb.Add(r)

  var r = new Room()
  r.SetID(4)
  r.SetName("Throne of the Goblin King")
  r.SetDescription("From his throne of skulls, the Goblin King rules his kingdom!")
  r.SetRegion(region)
  rdb.Add(r)

  // Regions
  rgndb.Purge()

  id = 1

  var r = new Region()
  r.SetName("Fields of Mud")
  r.SetID(1)
  rgndb.Add(r)

  r = new Region()
  r.SetName("Forest of the Goblin King")
  r.SetID(2)
  rgndb.Add(r)

  // Portals
  pdb.Purge()

  var p = new Portal()
  p.SetID(1)

  p.AddPortal(new PortalEntry(1,"north",2))
  p.AddPortal(new PortalEntry(2,"south",1))
  pdb.Add(p)

  for (var k in dbs)
  {
    l("Saving to directory " + savedir)
    dbs[k].SaveToDirectory(savedir)
  }

}
