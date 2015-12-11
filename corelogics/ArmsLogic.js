evalFile("ItemFactory.js")
evalFile("Logic.js")
evalFile("ArmsTypes.js")

function ArmsLogic(ownerid)
{
  Logic.call(this,IDBank.GetFreeID(TypeEnums.Logic),ownerid)
  this.SetName("ArmsLogic")
}

CopyPrototype(Logic,ArmsLogic)

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
    this.Disarm(item.GetAttribute("arms"))
    this.Arm(item)
    return
  }

  if(a.name == "do" && "disarm" == a.text)
  {
    var charter = Game.Character(this.OwnerID())
    if(!a.args)
    {
      var weaponid = charter.GetAttribute(ArmsTypes.Weapon)
      if(!weaponid)
      {
        charter.DoAction({name:"info",text:"There is nothing to disarm"})
        return
      }
      this.Disarm(ArmsTypes.Weapon)
    }
    else
    {
      var armeditems = this.ArmedItemsForCharter(charter)
      var disarmitem = Game.FilterNamedsByString(armeditems,a.args,1)[0]

      if(!disarmitem)
      {
        l1("ArmsLogic: do disarm: Found no armed item as per args " + a.args)
        charter.DoAction({name:"error",text:"You don't seem to have armed a '{0}'".format(a.args)})
        return
      }

      this.Disarm(disarmitem.GetAttribute("arms"))
    }

    return
  }

  return true
}

_p.Arm = function(item)
{
  var charter = Game.Character(this.OwnerID())
  charter.SetAttribute(item.GetAttribute("arms"),item.ID())
  l1("{0} set arms type attribute {1} to item {2} ".format(charter.Name(),item.GetAttribute("arms"),item.Name()))
  charter.DoAction({name:"info",text:"You use " + item.Name()})
  item.DoAction(new Action("didarmitem",charter.ID(),item.ID()))
}

_p.Disarm = function(armstype)
{
  var charter = Game.Character(this.OwnerID())
  var armid = charter.GetAttribute(armstype)
  if(armid)
  {
    var item = Game.Item(armid)
    charter.SetAttribute(armstype,0)
    charter.DoAction({name:"info",text:"You stop using " + item.Name()})
    item.DoAction(new Action("diddisarmitem",charter.ID(),item.ID()))
  }
}

_p.ArmedItemsForCharter = function(charter)
{
  var armeditems = []
  for(var type in ArmsTypes)
  {
    l1("ArmedItemsForCharter: Checking type " + type)
    var id = charter.GetAttribute(ArmsTypes[type])
    l1("ArmedItemsForCharter: Got id " + id + " for key " + ArmsTypes[type])
    if(id)
    {
      armeditems.push(id)
    }
  }

  l1("ArmedItemsForCharter: Num armed items: " + armeditems.length)
  return armeditems
}


RegisterLogic(ArmsLogic)
