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


  if("query" == a.name && "canarm" == a.text)
  {
      var item = Game.Item(a.arg1)
      if (item.HasAttribute("arms"))
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
    return
  }

  if(a.name == "do" && "disarm" == a.text)
  {
    var charter = Game.Character(this.ID())
    var weaponid = charter.GetAttribute("weapon")
    if(!weaponid)
    {
      charter.DoAction({name:"info",text:"There is nothing to disarm"})
      return
    }
    this.Disarm()
    return
  }

  return true
}

_p.Arm = function(item)
{
  var charter = Game.Character(this.ID())
  charter.SetAttribute("weapon",item.ID())
  charter.DoAction({name:"info",text:"You wield " + item.Name()})
}

_p.Disarm = function()
{
  var charter = Game.Character(this.ID())
  var weaponid = charter.GetAttribute("weapon")
  if(weaponid)
  {
    var item = Game.Item(weaponid)
    charter.SetAttribute("weapon",0)
    charter.DoAction({name:"info",text:"You stop using " + item.Name()})
  }
}


RegisterLogic(ArmsLogic)
