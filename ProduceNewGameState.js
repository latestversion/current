
evalFile("logics/GeorgieTalkLogic.js")
evalFile("ItemFactory.js")
evalFile("logics/ImScaredLogic.js")
evalFile("logics/CarrotQuestLogic.js")
evalFile("logics/SpawnCarrotsLogic.js")
evalFile("logics/ClosedGateOpenOnEventLogic.js")
evalFile("corelogics/DarkRoomLogic.js")
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

  l1("Purging databases",LG_NGS)

  idb.Purge()
  rgndb.Purge()
  rdb.Purge()
  cdb.Purge()
  pdb.Purge()


  var dummytid = 99
  var dtid = dummytid


  // FIELDS OF MUD REGION

  var r = rgndb.Create(dtid)
  r.SetName("Fields of Mud")

  var fieldsofmud = r


  l1("Adding rooms to " + fieldsofmud.Name(),LG_NGS)

  // FIELD OF MUD

  var r = rdb.Create(dtid)
  r.SetName("A field of mud")
  r.SetDescription("So yeah, this is where cabbages come from.")
  r.SetRegion(fieldsofmud.ID())
 // r.AddLogic(SpawnCarrotsLogic)

  var mudfield = r

  var character = new Character()
  character.SetName("Georgie Scrapneck")
  character.SetDescription("Georgie looks like he's had a rough life. His coat is worn and his trousers threadbare. Luckily his coughing isn't bad enough to stop him from enjoying smoke or two.")
  character.SetRoom(mudfield.ID())
  character.SetID(cdb.GetFreeID())
  cdb.Add(character)
  var logic = new GeorgieTalkLogic()
  character.AddExistingLogic(logic)
  character.AddLogic(CarrotQuestLogic)

  var i = idb.Create(MediocreCarrot)
  i.SetRoom(mudfield.ID())

  var i = idb.Create(DamnFineCarrot)
  i.SetRoom(mudfield.ID())

  // ANOTHER FIELD OF MUD

  var r = rdb.Create(dtid)
  r.SetName("Another field of mud")
  r.SetDescription("You've spent a lot of time here, getting familiar with the cold, hard ground.")
  r.SetRegion(fieldsofmud.ID())

  var mudfield2 = r

  var i  = idb.Create(Shovel)
  i.SetRoom(mudfield2.ID())



  //  SCARY FOREST REGION

  var r = rgndb.Create(dtid)
  r.SetName("Forest of the Goblin King")

  var forestregion = r


  // CLEARING IN THE FOREST

  var r = rdb.Create(dtid)
  r.SetName("Clearing in the forest")
  r.SetDescription("It's a clearing in the forest. The old bones of unfortunate adventurers aside, it's quite cozy.")
  r.SetRegion(forestregion.ID())

  var clearingintheforestroom = r


  // THRONE ROOM

  var r = rdb.Create()
  r.SetName("Throne of the Goblin King")
  r.SetDescription("From his throne of skulls, the Goblin King rules his kingdom!")
  r.SetRegion(forestregion.ID())

  var throneroom = r

  var king = Game.cdb.Create(CharacterTemplateIds.GoblinKing)
  king.SetRoom(r.ID())

    var i  = idb.Create(CuriousFrogFigurine)
  i.SetRoom(throneroom.ID())


  // SPIDER DEN

  var r = rdb.Create()
  r.SetName("Room of Silky Death")
  r.SetDescription("From the trees the spun silk hangs, like a tapestry of death, where the many legged one goes.")
  r.SetRegion(forestregion.ID())
  r.AddLogic(DarkRoomLogic)

  var spiderroom = r

  var charter = Game.cdb.Create(CharacterTemplateIds.GiantSpider)
  charter.SetRoom(spiderroom.ID())

  var i  = idb.Create(Shovel)
  i.SetRoom(spiderroom.ID())

  var i  = idb.Create(Shovel)
  var lightlogic = new Logic()
  lightlogic.__proto__.DoAction = function(){return true} // sometimes you just want to test stuff
  lightlogic.SetName("selflight")
  i.AddExistingLogic(lightlogic)
  i.SetName("A rusty, glowing shovel")
  i.SetRoom(spiderroom.ID())


  // THE TEMPLE

  var r = rdb.Create()
  r.SetName("The Temple")
  r.SetDescription("Pillars of marble and steps of granite. The elders bow to the Goddess of Wisdom.")
  r.SetRegion(forestregion.ID())

  var templeroom = r

  var charter = Game.cdb.Create(CharacterTemplateIds.WiseMan)
  charter.SetRoom(templeroom.ID())


 // Portal mudfield -> mudfield
  var p = new Portal()
  p.SetName("EW field<->field")
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(mudfield.ID(),"east",mudfield2.ID()))
  p.AddEntry(new PortalEntry(mudfield2.ID(),"west",mudfield.ID()))
  pdb.Add(p)

  var p = new Portal()
  p.SetName("NS mudfield<->clearing")
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(mudfield.ID(),"north",clearingintheforestroom.ID()))
  p.AddEntry(new PortalEntry(clearingintheforestroom.ID(),"south",mudfield.ID()))
  var logic = new ClosedGateOpenOnEventLogic(p.ID())

  logic.SetPassEvent("carrotquestcompleted")
  p.AddExistingLogic(logic)
  logic = null
  pdb.Add(p)

  var p = new Portal()
  p.SetName("EW clearing<->temple")
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(clearingintheforestroom.ID(),"east",templeroom.ID()))
  p.AddEntry(new PortalEntry(templeroom.ID(),"west",clearingintheforestroom.ID()))
  pdb.Add(p)


  var p = new Portal()
  p.SetName("NS clearing<->throne")
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(clearingintheforestroom.ID(),"north",throneroom.ID()))
  p.AddEntry(new PortalEntry(throneroom.ID(),"south",clearingintheforestroom.ID()))
  pdb.Add(p)


  var p = new Portal()
  p.SetName("EW clearing<->spider")
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(clearingintheforestroom.ID(),"west",spiderroom.ID()))
  p.AddEntry(new PortalEntry(spiderroom.ID(),"east",clearingintheforestroom.ID()))
  pdb.Add(p)



  var r = rgndb.Create(dtid)
  r.SetName("Area51")

  var area51 = r

  var room = rdb.Create()
  room.SetName("Frog Rehab")
  room.SetDescription("Frogs come here from all over the country,\nto get rid of their alcohol and narcotics addictions.")
  room.SetRegion(area51.ID())

  var frogrehab = room

  var charter = Game.cdb.Create(CharacterTemplateIds.TalkativeFrog)
  charter.SetRoom(frogrehab.ID())

  var charter = Game.cdb.Create(CharacterTemplateIds.InvisibleTalkativeFrog)
  charter.SetRoom(frogrehab.ID())

  var p = new Portal()
  p.SetName("EW temple<->frogrehab")
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(templeroom.ID(),"east",frogrehab.ID()))
  p.AddEntry(new PortalEntry(frogrehab.ID(),"west",templeroom.ID()))
  pdb.Add(p)

  for (var k in dbs)
  {
    l1(k)
    l1("Saving database " + dbs[k].Name() + " to directory " + savedir)
    dbs[k].SaveToDirectory(savedir)
  }

}
