
function HasCharacters()
{
  HasArray.call(this,"characters")
}

var _p = HasCharacters.prototype = {}

CopyProperties(HasArray.getPrototypeInstance("characters"),HasCharacters.prototype)
