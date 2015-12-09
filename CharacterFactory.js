
evalFile("Character")
evalFile("CtorRegistry")

CharacterFactory = new CtorRegistry("CharacterFactory")
RegisterCharacter = CharacterFactory.Register.bind(CharacterFactory)


function InheritAndRegisterCharacter(subclass)
{
  CopyPrototype(Character,subclass)
  RegisterCharacter(subclass)
}

function TomFinkledorf(id)
{
  var name = "Tom Finkledorf"
  Character.call(this,id,name,"His name is " + name + ". You get the picture.")
}
InheritAndRegisterCharacter(TomFinkledorf)

function GoblinKing(id)
{
  Character.call(this,id,"The *Goblin King*","The Goblin King has smiles like a razor's edge when he plots your demise.")
}
InheritAndRegisterCharacter(GoblinKing)

function GiantSpider(id)
{
  Character.call(this,id,"A GIANT SPIDER","This spider is the stuff of nightmares. Its many eyes reflect the image of a dead adventurer.")
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
}
InheritAndRegisterCharacter(TalkativeFrog)

function InvisibleTalkativeFrog(id)
{
  Character.call(this,id,"An invisible frog","This frog likes to talk. And is VERY hard to see.")
  this.AddExistingLogic(new InvisibleLogic(this.ID()))
}
InheritAndRegisterCharacter(InvisibleTalkativeFrog)


