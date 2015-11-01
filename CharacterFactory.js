

evalFile("Character.js",this)


CharacterTemplateIdCount = 0

function TomFinkdorf()
{
  Character.call(this)
  this.SetName("Tom Finkdorf")
  this.SetDescription("His name is Tom Finkdorf. You get the picture.")
  this.SetTemplate(TomFinkdorf.tid)
}

TomFinkdorf.tid = CharacterTemplateIdCount++
CopyPrototype(Character,TomFinkdorf)


CharacterFactory = {}

CharacterFactory.Produce = function(tid)
{
  if (TomFinkdorf.tid == tid)
  {
    return new TomFinkdorf()
  }
}



