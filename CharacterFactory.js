

evalFile("Character.js")


function CharacterFactory()
{

}


CharacterFactory.ctors = []
CharacterFactory.registerCtor = function(id,fnc)
{
  fnc.id = id
  CharacterFactory.ctors.push(fnc)
}

var _p = CharacterFactory.prototype = {}

_p.create = function(templateid)
{

}
