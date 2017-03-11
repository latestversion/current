evalFile("CharacterFactory")

function TomFinkledorf(id)
{
  var name = "Tom Finkledorf"
  Character.call(this,id,name,"His name is " + name + ". You get the picture.")
  this.SetAttribute("maxhitpoints",20)
  this.SetAttribute("hitpoints",20)
}
InheritAndRegisterCharacter(TomFinkledorf)

function BillBugle(id)
{
  var name = "Bill Bugle"
  Character.call(this,id,name,"Bill is a small boy with dirty clothes.")
}
InheritAndRegisterCharacter(BillBugle)

function DottyFalthorpe(id)
{
  var name = "Dotty Falthorpe"
  Character.call(this,id,name,"Dotty stares vacantly into the distance. \"I had a mom once... \"")
}
InheritAndRegisterCharacter(DottyFalthorpe)


function GeorgieScrapneck(id)
{
  var name = "Georgie Scrapneck"
  Character.call(this,id,name,"Georgie looks like he's had a rough life. His coat is worn and his trousers threadbare. Luckily his coughing isn't bad enough to stop him from enjoying a smoke or two.")
}
InheritAndRegisterCharacter(GeorgieScrapneck)


function RoryHardknuckle(id)
{
  var name = "Rory Hardknuckle"
  Character.call(this,id,name,"Rory is the caretaker of the orphanage and responsible for the wellbeing of the children. If you're not feeling well, he'll treat you with a slap to the face or a fist in your back.")
}
InheritAndRegisterCharacter(RoryHardknuckle)

function GoblinKing(id)
{
  Character.call(this,id,"The *Goblin King*","The Goblin King smiles like a razor's edge when he plots your demise.")
}
InheritAndRegisterCharacter(GoblinKing)

function MudfieldOrphanPig(id)
{
  Character.call(this,id,"Orphan Pig","Orhpan Pig is a medium sized pig. It seems to be quite enjoying the mud.")
}
InheritAndRegisterCharacter(MudfieldOrphanPig)

function GiantSpider(id)
{
  Character.call(this,id,"A GIANT SPIDER","This spider is the stuff of nightmares. Its many eyes reflect the image of a dead adventurer.")
  this.AddLogic(CombatLogic)
  this.SetAttribute("maxhitpoints",40)
  this.SetAttribute("hitpoints",40)
  var i = idb.Create(Pincer)
  this.SetAttribute(ArmsTypes.DefaultWeapon,i.ID())
  i.SetCharacter(this.ID())
}
InheritAndRegisterCharacter(GiantSpider)

function WiseMan(id)
{
  Character.call(this,id,"The wise old hermit","This woman is very smart, because she's lived in a cave her entire life.")
}
InheritAndRegisterCharacter(WiseMan)

function TalkativeFrog(id)
{
  Character.call(this,id,"A talkative frog","This frog likes to talk. Talk talk talk.")
  this.AddLogic(CombatLogic)
  this.SetAttribute("maxhitpoints",10)
  this.SetAttribute("hitpoints",3)
}
InheritAndRegisterCharacter(TalkativeFrog)

function InvisibleTalkativeFrog(id)
{
  Character.call(this,id,"An invisible frog","This frog likes to talk. And is VERY hard to see.")
  this.AddExistingLogic(new InvisibleLogic(this.ID()))
}
InheritAndRegisterCharacter(InvisibleTalkativeFrog)


