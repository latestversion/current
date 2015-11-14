

LG_NGS = "LG_NGS"

function ProduceNewGameState(dbs,savedir)
{
  l1("Producing the new game state")

  var idb = dbs[TypeEnums.Item]
  var cdb = dbs[TypeEnums.Character]
  var rdb = dbs[TypeEnums.Room]
  var rgndb = dbs[TypeEnums.Region]
  var pdb = dbs[TypeEnums.Portal]

  // Items
  l1("Adding items",LG_NGS)
  idb.Purge()
  var id = 1
  var i = new Item()
  i.SetID(id++)
  i.SetName("A figurine of the curious frog")
  i.SetDescription("A curiosu frogu is a finu friend.")
  i.SetRoom(1)
  idb.Add(i)


  var i = new Item()
  i.SetID(id++)
  i.SetName("A mediocre carrot")
  i.SetDescription("It's a not so fine carrot.")
  i.SetRoom(1)
  idb.Add(i)

  var i = new Item()
  i.SetID(id++)
  i.SetName("A damn fine carrot")
  i.SetDescription("It's a DAMN fine carrot.")
  i.SetRoom(1)
  idb.Add(i)


  // Characters
  cdb.Purge()

  var character = new Character()
  character.SetName("Georgie Scrapneck")
  character.SetDescription("Georgie looks like he's had a rough life. His coat is worn and his trousers threadbare. Luckily his coughing isn't bad enough to stop him from enjoying smoke or two.")
  character.SetRoom(2)
  character.SetID(cdb.GetFreeID())
  cdb.Add(character)

  // Rooms
  l1("Adding rooms",LG_NGS)
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
  l1("Adding regions",LG_NGS)
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
  l1("Adding portals",LG_NGS)
  pdb.Purge()

  var p = new Portal()
  p.SetID(1)

  p.AddEntry(new PortalEntry(1,"north",2))
  p.AddEntry(new PortalEntry(2,"south",1))
  pdb.Add(p)

  for (var k in dbs)
  {
    l("Saving database " + dbs[k].Name() + " to directory " + savedir)
    dbs[k].SaveToDirectory(savedir)
  }

}
