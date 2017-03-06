
evalFile("logics/GeorgieTalkLogic.js")
evalFile("ItemFactory.js")
evalFile("logics/CarrotQuestLogic.js")
evalFile("logics/SpawnCarrotsLogic.js")
evalFile("logics/ClosedGateOpenOnEventLogic.js")
evalFile("corelogics/DarkRoomLogic.js")
evalFile("Logic.js")
evalFile("mudquest/MudfieldRegionWeatherLogic")

LG_NGS = "LG_NGS"

function ProduceNewGameState(dbs,savedir)
{
  l1("Producing the new game state")

  // What assery is this? Global databases out of the blue?
  // Game().Databases()
  // Or better yet... DatabasesWithIdRangeThingaMojig()

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

  // Template ID not relevant for rooms and regions
  var fieldsofmudregion = rgndb.Create(dtid)
  fieldsofmudregion.SetName("Fields of Mud")

  // as opposed to AddLogic(MudfieldRegionWeatherLogic)
  var logic = new MudfieldRegionWeatherLogic(fieldsofmudregion.ID())
  fieldsofmudregion.AddExistingLogic(logic)
  l1("fieldsofmudregion.ID(): {0} wlogic.ID(): {1}, wlogic.ownerid: {2} ".format(fieldsofmudregion.ID(),logic.ID(),logic.OwnerID()))


  l1("Adding rooms to " + fieldsofmudregion.Name(),LG_NGS)

  // FIELD OF MUD

  var mudfieldroom = rdb.Create(dtid)
  mudfieldroom.SetName("A field of mud")
  mudfieldroom.SetDescription("So yeah, this is where cabbages come from. Or would have, if anyone had planted any. Now it's just mud. Mud and mud again.")
  mudfieldroom.SetRegion(fieldsofmudregion.ID())

  var mudfieldroom2 = rdb.Create(dtid)
  mudfieldroom2.SetName("Central field of mud")
  mudfieldroom2.SetDescription("You've spent a lot of time here, getting familiar with the mud.")
  mudfieldroom2.SetRegion(fieldsofmudregion.ID())

  var potatofieldroom = rdb.Create(dtid)
  potatofieldroom.SetName("Potato field")
  potatofieldroom.SetDescription("In this muddy place there is a small patch of slightly less muddy ground where the orphans grow potatoes.")
  potatofieldroom.SetRegion(fieldsofmudregion.ID())

  var beetfieldroom = rdb.Create(dtid)
  beetfieldroom.SetName("Beets field")
  beetfieldroom.SetDescription("Scrawny looking trees frame a small patch of land where beets are grown.")
  beetfieldroom.SetRegion(fieldsofmudregion.ID())

  var gateroom = rdb.Create(dtid)
  gateroom.SetName("End of Orphan Road")
  gateroom.SetDescription("The ground here is weirdly hard and feels strange to feet used to the sensation of mud. A small path goes north, away from the orphanage and its sad agricultural endeavours. Some say that the path leads to the village.")
  //But what would you know, you've never been outside the grounds of the orphanage. Except for when you lived with your father of course. But those days are long gone and hard to remember.
  gateroom.SetRegion(fieldsofmudregion.ID())

  var orphanroom = rdb.Create(dtid)
  orphanroom.SetName("Outside the orphanage")
  orphanroom.SetDescription("When your dad disappeared they took you to the orphanage. Oh how you hate the orphanage.")
  orphanroom.SetRegion(fieldsofmudregion.ID())

  var i  = idb.Create(SackOfTheOrphanage)
  i.SetRoom(orphanroom.ID())


  // Portals added to rooms in Game.ConsistencyCheckDatabases...
  var p = new Portal()
  p.SetName("NS field<->field")
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(mudfieldroom.ID(),"north",mudfieldroom2.ID()))
  p.AddEntry(new PortalEntry(mudfieldroom2.ID(),"south",mudfieldroom.ID()))
  pdb.Add(p)

  var p = new Portal()
  p.SetName("EW field<->orphanage")
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(mudfieldroom.ID(),"east",orphanroom.ID()))
  p.AddEntry(new PortalEntry(orphanroom.ID(),"west",mudfieldroom.ID()))
  pdb.Add(p)

  p = new Portal()
  p.SetName("NS field<->gate")
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(mudfieldroom2.ID(),"north",gateroom.ID()))
  p.AddEntry(new PortalEntry(gateroom.ID(),"south",mudfieldroom2.ID()))
  pdb.Add(p)

  p = new Portal()
  p.SetName("WE potato<->field")
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(mudfieldroom2.ID(),"west",potatofieldroom.ID()))
  p.AddEntry(new PortalEntry(potatofieldroom.ID(),"east",mudfieldroom2.ID()))
  pdb.Add(p)

  p = new Portal()
  p.SetName("WE beets<->field")
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(mudfieldroom2.ID(),"east",beetfieldroom.ID()))
  p.AddEntry(new PortalEntry(beetfieldroom.ID(),"west",mudfieldroom2.ID()))
  pdb.Add(p)

  var c = cdb.Create(BillBugle)
  c.SetRoom(mudfieldroom2.ID())

  var c = cdb.Create(DottyFalthorpe)
  c.SetRoom(mudfieldroom2.ID())

  var c = cdb.Create(RoryHardknuckle)
  c.SetRoom(orphanroom.ID())

  var c = cdb.Create(GeorgieScrapneck)
  c.SetRoom(gateroom.ID())

/*


  var character = new Character()
  character.SetName("Georgie Scrapneck")
  character.SetDescription("Georgie looks like he's had a rough life. His coat is worn and his trousers threadbare. Luckily his coughing isn't bad enough to stop him from enjoying smoke or two.")
  character.SetRoom(mudfieldroom.ID())
  character.SetID(cdb.GetFreeID())
  cdb.Add(character)
  character.AddExistingLogic(new GeorgieTalkLogic())
  character.AddLogic(CarrotQuestLogic)



  var i = idb.Create(MediocreCarrot)
  i.SetRoom(mudfieldroom.ID())

  var i = idb.Create(DamnFineCarrot)
  i.SetRoom(mudfieldroom.ID())

  // ANOTHER FIELD OF MUD

  var r = rdb.Create(dtid)
  r.SetName("Another field of mud")
  r.SetDescription("You've spent a lot of time here, getting familiar with the cold, hard ground.")
  r.SetRegion(fieldsofmudregion.ID())

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

  // ROOM WITH RING

  r = rdb.Create(dtid)
  r.SetName("Among the trees")
  r.SetDescription("Thick and thorny the forest stands. Murky roots have long since closed off the paths of old.")
  r.SetRegion(forestregion.ID())

  var roomwithringroom = r

  r.AddLogic(DarkRoomLogic)

  var i = idb.Create(Ring)
  i.SetRoom(roomwithringroom.ID())


  // THRONE ROOM

  var r = rdb.Create()
  r.SetName("Throne of the Goblin King")
  r.SetDescription("From his throne of skulls, the Goblin King rules his kingdom!")
  r.SetRegion(forestregion.ID())

  var throneroom = r

  var king = Game.cdb.Create(GoblinKing)
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

  var charter = Game.cdb.Create(GiantSpider)
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
  i.SetDescription("The rusty shovel emanates a magic *glow*!")


  // THE TEMPLE

  var r = rdb.Create()
  r.SetName("The Temple")
  r.SetDescription("Pillars of marble and steps of granite. The elders bow to the Goddess of Wisdom.")
  r.SetRegion(forestregion.ID())

  var templeroom = r

  var charter = Game.cdb.Create(WiseMan)
  charter.SetRoom(templeroom.ID())

  var i  = idb.Create(Lantern)
  i.SetRoom(templeroom.ID())


 // Portal mudfield -> mudfield
  var p = new Portal()
  p.SetName("EW field<->field")
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(mudfieldroom.ID(),"east",mudfield2.ID()))
  p.AddEntry(new PortalEntry(mudfield2.ID(),"west",mudfieldroom.ID()))
  pdb.Add(p)

  var p = new Portal()
  p.SetName("NS mudfield<->clearing")
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(mudfieldroom.ID(),"north",clearingintheforestroom.ID()))
  p.AddEntry(new PortalEntry(clearingintheforestroom.ID(),"south",mudfieldroom.ID()))
  var logic = new ClosedGateOpenOnEventLogic(p.ID())

  logic.SetPassEvent("carrotquestcompleted")
  p.AddExistingLogic(logic)
  logic = null
  pdb.Add(p)



  var p = new Portal()
  p.SetName("EW throne<->ringroom")
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(throneroom.ID(),"east",roomwithringroom.ID()))
  p.AddEntry(new PortalEntry(roomwithringroom.ID(),"west",throneroom.ID()))
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

  var charter = Game.cdb.Create(TalkativeFrog)
  charter.SetRoom(frogrehab.ID())

  var charter = Game.cdb.Create(InvisibleTalkativeFrog)
  charter.SetRoom(frogrehab.ID())

  var p = new Portal()
  p.SetName("EW temple<->frogrehab")
  p.SetID(pdb.GetFreeID())
  p.AddEntry(new PortalEntry(templeroom.ID(),"east",frogrehab.ID()))
  p.AddEntry(new PortalEntry(frogrehab.ID(),"west",templeroom.ID()))
  pdb.Add(p)

  */

  for (var k in dbs)
  {
    l1(k)
    l1("Saving database " + dbs[k].Name() + " to directory " + savedir)
    dbs[k].SaveToDirectory(savedir)
  }

}
