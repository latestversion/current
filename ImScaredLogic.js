evalFile("LogicFactory.js")

function ImScaredLogic(id)
{
  Entity.call(this)
  this.cid = id
  this.SetName("ImScared")
}

var _p = ImScaredLogic.prototype

CopyPrototype(Entity,ImScaredLogic)

_p.DoAction = function(a)
{
  if(a.name == "didenterroom")
  {
    Game.AddAction({name:"say",arg1:a.arg1,text:"I'm scared..."},500)
  }

  return true
}

LogicFactory.RegisterLogic(ImScaredLogic.name,ImScaredLogic)