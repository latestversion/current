

evalFile("Character.js",this)

CharacterTemplateIdCount = 0

var CharacterTemplateIds = {}

CharacterTemplateIds.TomFinkdorf = CharacterTemplateIdCount++
CharacterTemplateIds.GoblinKing = CharacterTemplateIdCount++
CharacterTemplateIds.GiantSpider = CharacterTemplateIdCount++
CharacterTemplateIds.WiseMan = CharacterTemplateIdCount++

CharacterFactory = {}

CharacterFactory.Create = function(tid,id)
{
  var c = new Character()
  c.SetTemplate(tid)

  if (CharacterTemplateIds.TomFinkdorf == tid)
  {
    var name = "Tom Finkledorf"
    c.SetName(name)
    c.SetID(id)
    c.SetDescription("His name is " + name + ". You get the picture.")
  }
  else if(CharacterTemplateIds.GoblinKing == tid)
  {
    var name = "The *Goblin King*"
    c.SetName(name)
    c.SetID(id)
    c.SetDescription("The Goblin King has smiles like a razor's edge when he plots your demise.")
  }
  else if(CharacterTemplateIds.GiantSpider == tid)
  {

    var name = "A GIANT SPIDER"
    c.SetName(name)
    c.SetID(id)
    c.SetDescription("This spider is the stuff of nightmares. Its many eyes reflect the image of a dead adventurer.")
  }
  else if(CharacterTemplateIds.WiseMan == tid)
  {

    var name = "The wise old hermit"
    c.SetName(name)
    c.SetID(id)
    c.SetDescription("This man is very smart, becuase he's lived in a cave his entire life.")
  }

  return c
}



