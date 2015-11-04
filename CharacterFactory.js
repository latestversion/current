

evalFile("Character.js",this)


CharacterTemplateIdCount = 0

var CharacterTemplateIds = {}

CharacterTemplateIds.TomFinkdorf = CharacterTemplateIdCount++


CharacterFactory = {}

CharacterFactory.Create = function(tid)
{
  var c = new Character()
  c.SetTemplate(tid)

  if (CharacterTemplateIds.TomFinkdorf == tid)
  {
    var name = "Tom Finkledorf"
    c.SetName(name)
    c.SetDescription("His name is " + name + ". You get the picture.")
  }

  return c
}



