  
evalFile("Character")
evalFile("CtorRegistry")

CharacterFactory = new CtorRegistry("CharacterFactory")
RegisterCharacter = CharacterFactory.Register.bind(CharacterFactory)

function InheritAndRegisterCharacter(subclass)
{
  CopyPrototype(Character,subclass)
  RegisterCharacter(subclass)
}