evalFile("ItemFactory.js")
evalFile("Action.js")
evalFile("RNG.js")


function CombatLogic(id)
{
  Entity.call(this)
  this.SetID(id)
  this.SetName("CombatLogic")
  this.attackedlist = []
  this.target = 0
}

CopyPrototype(Entity,CombatLogic)

var _p = CombatLogic.prototype


_p.DoAction = function(a)
{

  var name = a.name
  var text = a.text


  if("do" == name && "attack" == text)
  {
    var attacker = Game.Character(this.ID())
    var target = Game.Character(this.target)
    l1("{0} is to attack {1}".format(attacker.Name(),target.Name()))
    Game.AddAction(new Action("do",this.ID(),0,0,0,"attack"),3000)

    var weapon = new Item()
    weapon.SetName("Fist of Fury!")
    weapon.SetAttribute("mindamage",0)
    weapon.SetAttribute("maxdamage",1)

    var chancetohit = 50

    if(RNG.RandomInt(100) >= chancetohit)
    {
      Game.AddAction({arg1:attacker.Room(),name:"physicalevent",actors:[this.ID(),target.ID()],text:"{0} swings at {1} but misses!".format(attacker.Name(),target.Name()),purevisual:true},0)
      attacker.DoAction({name:"info",text:"Your attack misses " + target.Name()})
      target.DoAction({name:"info",text: attacker.Name() + " swings at you but misses!"})
      return
    }
    else
    {
      var damage = RNG.RandomInt(weapon.GetAttribute("mindamage"),weapon.GetAttribute("maxdamage"))
      Game.AddAction({arg1:attacker.Room(),name:"physicalevent",actors:[this.ID(),target.ID()],text:"{0} hits {1} with {2} for {3} damage!".format(attacker.Name(),target.Name(),weapon.Name(),damage),purevisual:true},0)
      attacker.DoAction({name:"info",text:"You hit " + target.Name() + " for " + damage + " damage!"})
      target.DoAction({name:"info",text: attacker.Name() + " slashes you for " + damage + " damage!"})
      return
    }

    return
  }

  if("query" == name && "canattack" == text)
  {
      return false
  }

  if("modifyattribute" == name && "maxhitpoints" == text)
  {
    var charter = this.ID()
    var maxhp = charter.GetAttribute("maxhitpoints")
    var hp = charter.GetAttribute("hitpoints")

    if (hp > maxhp)
    {
      charter.SetAttribute("hitpoints",maxhp)
    }
    return
  }

  if("do" == name && "attacked" == text)
  {
    var attackerid = a.arg3
    if(this.attackedlist.indexOf(attackerid) == -1)
    {
      this.attackedlist.push(attackerid)
    }
    return
  }


  if("do" == name && "brokeattack" == text)
  {
    var attackerid = a.arg3
    var idx = this.attackedlist.indexOf(attackerid)
    if(-1 != idx)
    {
      this.attackedlist.splice(idx,1)
    }
    return
  }


  if("do" == name && "initattack" == text)
  {
    if(this.ID() == a.arg3)
    {
      return
    }

    if (0 != this.target)
    {
      var target = Game.Character(this.target)
      target.DoAction({name:"do",text:"brokeattack",arg3:this.ID()})
    }
    else
    {
      Game.AddAction({name:"do",arg1:this.ID(),text:"attack"},0)
    }

    this.target = a.arg3
    var target = Game.Character(a.arg3)
    var attacker = Game.Character(this.ID())
    target.DoAction(new Action("do",0,0,this.ID(),0,"attacked"))
    Game.AddAction({arg1:attacker.Room(),name:"physicalevent",actors:[this.ID(),target.ID()],text:"{0} attacks {1}!".format(attacker.Name(),target.Name()),purevisual:true},0)
    attacker.DoAction({name:"info",text:"You attack " + target.Name()})

    return
  }

  if("do" == name && data == "breakattack")
  {
    this.Break()
    return
  }

  if (name == "do" && text == "killed")
  {
    this.Break()
    return
  }


  return true
}

_p.Break = function()
{
  if (this.target == 0)
  {
    return
  }

  var attacker = Game.Character(this.ID())
  var target = Game.Character(this.target)
  // Kill action waiting in even scheduler!!!!!!111
  Game.AddAction({arg1:attacker.Room(),name:"physicalevent",actors:[this.ID(),target.ID()],text:"{0} stops attacking {1}!".format(attacker.Name(),target.Name()),purevisual:true},0)
  target.DoAction(new Action("do",0,0,0,0,"brokeattack"))
  self.target = 0
}

RegisterLogic(CombatLogic)
