
function HasCharacters()
{
  HasContainer.call(this,"characters")
}

var _p = HasCharacters.prototype = {}

CopyProperties(HasContainer.getPrototypeInstance("characters"),HasCharacters.prototype)
