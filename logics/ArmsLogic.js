evalFile("ItemFactory.js")


function ArmsLogic(id)
{
  Entity.call(this)
  this.id = id
  this.SetName("ArmsLogic")
}

CopyPrototype(Entity,ArmsLogic)

var _p = ArmsLogic.prototype


_p.DoAction = function(a)
{


  if(a.name == "query" && a.text="canarm")
  {
      var item = Game.Item(a.arg1)
      if (1 == item.GetAttribute("arms"))
      {
        return false
      }

      return true
  }

  if("do" == a.name && "arm" == a.text)
  {
    var item = Game.Item(a.arg1)
    this.Disarm()
    this.Arm(item)
  }

  if(a.name == "do" && "disarm" == a.text)
  {
    this.Disarm()
  }

  return true
}

_p.Arm = function(item)
{
  var charter = Game.Character(this.ID())
  charter.SetAttribute("weapon",item.ID())
  charter.DoAction({name:"info",text:"You wield " + item.Name()})
}

_P.Disarm = function()
{
  var charter = Game.Character(this.iD())
  if(charter.HasAttribute("weapon"))
  {
    charter.SetAttribute("weapon",0)
    charter.DoAction({name:"info",text:"You stop using " + item.Name()})
  }
}


RegisterLogic(ArmsLogic)
