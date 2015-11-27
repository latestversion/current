
evalFile("logics/GeorgieTalkLogic.js")
evalFile("ItemFactory.js")
evalFile("logics/ImScaredLogic.js")
evalFile("logics/CarrotQuestLogic.js")
evalFile("logics/SpawnCarrotsLogic.js")
evalFile("logics/ClosedGateOpenOnEventLogic.js")
evalFile("logics/DarkRoomLogic.js")
evalFile("Logic.js")

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
  rgndb.Purge()
  rdb.Purge()
  cdb.Purge()
  pdb.Purge()

  var i  = idb.Create(ItemTemplateIDs.Shovel)
  i.SetRoom(5)

  var i  = idb.Create(ItemTemplateIDs.CuriousFrogFigurine)
  i.SetRoom(3)

  var i  = idb.Create(ItemTemplateIDs.MediocreCarrot)
  i.SetRoom(1)

  var i = idb.Create(ItemTemplateIDs.DamnFineCarrot)
  i.SetRoom(1)


  // Characters


  var character = new Character()
  character.SetName("Georgie Scrapneck")
  character.SetDescription("Georgie looks like he's had a rough life. His coat is worn and his trousers threadbare. Luckily his coughing isn't bad enough to stop him from enjoying smoke or two.")
  character.SetRoom(1)
  character.SetID(cdb.GetFreeID())
  cdb.Add(character)
  var logic = new GeorgieTalkLogic()
  character.AddExistingLogic(logic)
  character.AddLogic(CarrotQuestLogic)



  // Rooms
  l1("Adding rooms",LG_NGS)


  var id = 1
  var region = 1
  var r = new Room()
  r.SetID(1)
  r.SetName("A field of mud")
  r.SetDescription("So yeah, this is where cabbages come from.")
  r.SetRegion(region)
  r.AddLogic(SpawnCarrotsLogic)
  rdb.Add(r)


  var region = 1
  var r = new Room()
  r.SetID(5)
  r.SetName("Another field of mud")
  r.SetDescription("You've spent a lot of time here, getting familiar with the cold, hard ground.")
  r.SetRegion(region)
  rdb.Add(r)


  region = 2
  var r = new Room()
  r.SetID(2)
  r.SetName("Path to scary forest")
  r.SetDescription("A narrow scary path. It leads to the scary forest.")
  r.SetRegion(region)
  r.AddLogic(ImScaredLogic)
  rdb.Add(r)



  var r = new Room()
  r.SetID(3)
  r.SetName("Clearing in the forest")
  r.SetDescription("It's a clearing in the forest. The old bones of unfortunate adventurers aside, it's quite cozy.")
  r.SetRegion(region)
  rdb.Add(r)

  var clearingintheforestroom = r

  var r = new Room()
  r.SetID(4)
  r.SetName("Throne of the Goblin King")
  r.SetDescription("From his throne of skulls, the Goblin King rules his kingdom!")
  r.SetRegion(region)
  rdb.Add(r)

  var king = Game.cdb.Create(CharacterTemplateIds.GoblinKing)
  king.SetRoom(4)


  var r = new Room()
  r.SetID(6)
  r.SetName("Room of Silky Death")
  r.SetDescription("From the trees the spun silk hangs, like a tapestry of death, where the many legged one goes.")
  r.SetRegion(region)
  rdb.Add(r)
  r.AddLogic(DarkRoomLogic)

  var spiderroom = r

  var charter = Game.cdb.Create(CharacterTemplateIds.GiantSpider)
  charter.SetRoom(spiderroom.ID())

  var i  = idb.Create(ItemTemplateIDs.Shovel)
  i.SetRoom(spiderroom.ID())

  var i  = idb.Create(ItemTemplateIDs.Shovel)
  var lightlogic = new Logic()
  lightlogic.__proto__.DoAction = function(){return true}
  lightlogic.SetName("selflight")
  i.AddExistingLogic(lightlogic)
  i.SetName("A rusty, glowing shovel")
  i.SetRoom(spiderroom.ID())

var p = new Portal()
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(clearingintheforestroom.ID(),"west",spiderroom.ID()))
  p.AddEntry(new PortalEntry(spiderroom.ID(),"east",clearingintheforestroom.ID()))
  p.AddExistingLogic(logic)
  pdb.Add(p)

  var r = new Room()
  r.SetID(7)
  r.SetName("The Temple")
  r.SetDescription("Pillars of marble and steps of granite. The elders bow to the Goddess of Wisdom.")
  r.SetRegion(region)
  rdb.Add(r)

  var templeroom = r

  var charter = Game.cdb.Create(CharacterTemplateIds.WiseMan)
  charter.SetRoom(templeroom.ID())

  var p = new Portal()
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(clearingintheforestroom.ID(),"east",templeroom.ID()))
  p.AddEntry(new PortalEntry(templeroom.ID(),"west",clearingintheforestroom.ID()))
  p.AddExistingLogic(logic)
  pdb.Add(p)

  id = 1

  var r = new Region()
  r.SetName("Fields of Mud")
  r.SetID(1)
  rgndb.Add(r)

  r = new Region()
  r.SetName("Forest of the Goblin King")
  r.SetID(2)
  rgndb.Add(r)

  var p = new Portal()
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(1,"north",2))
  p.AddEntry(new PortalEntry(2,"south",1))
  var logic = new ClosedGateOpenOnEventLogic(p.ID())
  logic.SetPassEvent("carrotquestcompleted")
  p.AddExistingLogic(logic)
  pdb.Add(p)


  var p = new Portal()
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(1,"east",5))
  p.AddEntry(new PortalEntry(5,"west",1))
  pdb.Add(p)

  var p = new Portal()
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(2,"north",3))
  p.AddEntry(new PortalEntry(3,"south",2))
  pdb.Add(p)

  var p = new Portal()
  p.SetID(pdb.GetFreeID())

  p.AddEntry(new PortalEntry(3,"north",4))
  p.AddEntry(new PortalEntry(4,"south",3))
  pdb.Add(p)

  for (var k in dbs)
  {
    l("Saving database " + dbs[k].Name() + " to directory " + savedir)
    dbs[k].SaveToDirectory(savedir)
  }

}
