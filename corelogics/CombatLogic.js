evalFile("ItemFactory.js")
evalFile("Action.js")
evalFile("RNG.js")
evalFile("Logic")

LG_COMBAT_LOGIC = "LG_COMBAT_LOGIC"

function CombatLogic(ownerid)
{
  Logic.call(this,ownerid)
  this.SetName("CombatLogic")
  this.attackedlist = []
  this.target = 0
}

CopyPrototype(Logic,CombatLogic)

var _p = CombatLogic.prototype

_p.DoAction = function(a)
{

  var name = a.name
  var text = a.text
  var me = Game.Character(this.OwnerID())

  if("do" == name && "initattack" == text)
  {
    if(this.OwnerID() == a.arg3)
    {
      return
    }

    if (0 != this.target)
    {
      var target = Game.Character(this.target)
      target.DoAction({name:"do",text:"brokeattack",arg3:this.OwnerID()})
    }
    else
    {
      Game.AddAction({name:"do",arg1:this.OwnerID(),text:"attack"},0)
    }

    this.target = a.arg3
    var target = Game.Character(a.arg3)
    var attacker = Game.Character(this.OwnerID())
    target.DoAction(new Action("do",0,0,this.OwnerID(),0,"attacked"))
    Game.AddAction({arg1:attacker.Room(),name:"physicalevent",actors:[this.OwnerID(),target.ID()],text:"{0} attacks {1}!".format(attacker.Name(),target.Name()),purevisual:true},0)
    attacker.DoAction({name:"info",text:"You attack " + target.Name()})

    return
  }

  if("do" == name && "attacked" == text)
  {
    var attackerid = a.arg3
    if(this.attackedlist.indexOf(attackerid) == -1)
    {
      this.attackedlist.push(attackerid)
    }

    if(!this.target)
    {
      this.target = attackerid
      Game.AddAction({name:"do",arg1:this.OwnerID(),text:"attack"},0)
    }

    return
  }

  if("do" == name && "attack" == text)
  {
    var attacker = Game.Character(this.OwnerID())
    var target = Game.Character(this.target)
    l1("{0} do attack {1}".format(attacker.Name(),target.Name()),LG_COMBAT_LOGIC)
    var handle = Game.AddAction(new Action("do",this.OwnerID(),0,0,0,"attack"),3000)
    this.SetEventID(handle)


    var wepid,weapon
    if(attacker.HasAttribute(ArmsTypes.Weapon))
    {
      wepid = attacker.GetAttribute(ArmsTypes.Weapon)
      weapon = Game.Item(wepid)
      l1("Attacker {0} had a weapon attribute: {1}".format(attacker.Name(),weapon.Name()),LG_COMBAT_LOGIC)
    }
    else if(attacker.HasAttribute(ArmsTypes.DefaultWeapon))
    {
      wepid = attacker.GetAttribute(ArmsTypes.DefaultWeapon)
      weapon = Game.Item(wepid)
      l1("Attacker {0} had a defaultweapon attribute: {1}".format(attacker.Name(),weapon.Name()),LG_COMBAT_LOGIC)
    }
    else
    {
      l1("Attacker {0} apparently had neitehr weapon nor defaultweapon",LG_COMBAT_LOGIC)
      weapon = new Item()
      weapon.SetName("Fist of Fury!")
      weapon.SetAttribute("mindamage",1)
      weapon.SetAttribute("maxdamage",2)
    }

    var chancetohit = 99

    if(RNG.RandomInt(100) >= chancetohit)
    {
      Game.AddAction({arg1:attacker.Room(),name:"physicalevent",actors:[this.OwnerID(),target.ID()],text:"{0} swings at {1} but misses!".format(attacker.Name(),target.Name()),purevisual:true},0)
      attacker.DoAction({name:"info",text:"Your attack misses " + target.Name()})
      target.DoAction({name:"info",text: attacker.Name() + " swings at you but misses!"})
      return
    }
    else
    {
      var damage = RNG.RandomInt(weapon.GetAttribute("mindamage"),weapon.GetAttribute("maxdamage"))
      Game.AddAction({arg1:attacker.Room(),name:"physicalevent",actors:[this.OwnerID(),target.ID()],text:"{0} hits {1} with {2} for {3} damage!".format(attacker.Name(),target.Name(),weapon.Name(),damage),purevisual:true},0)
      attacker.DoAction({name:"info",text:"You hit " + target.Name() + " for " + damage + " damage!"})
      target.DoAction({name:"info",text: attacker.Name() + " slashes you for " + damage + " damage with " + weapon.Name() + "!"})
      //target.DoAction({name:"info",text: "{0} / {1}".format(target.GetAttribute("hitpoints"),target.GetAttribute("maxhitpoints"))})
      target.DoAction(new Action("modifyattribute",target.ID(),-1*damage,0,0,"hitpoints"))
      return
    }

    return
  }

  if("modifyattribute" == name && "hitpoints" == text && a.arg1 == this.OwnerID())
  {
    var hp = me.GetAttribute("hitpoints") + a.arg2
    l1("CombatLogic: " + me.Name() + " got hp modified by " + a.arg2,LG_COMBAT_LOGIC)
    me.SetAttribute("hitpoints",hp)
    if(hp < 0)
    {
      l1("CombatLogic: " + me.Name() + " got hp reduced to below zero.",LG_COMBAT_LOGIC)
      me.DoAction(new Action("do",0,0,0,0,"died"))
    }
    return
  }

  if("do" == name && "died" == text)
  {
    l1("do died for " + me.Name(),LG_COMBAT_LOGIC)
    this.Break()
    Game.AddAction({arg1:me.Room(),name:"physicalevent",actors:[me.ID()],text:"{0} drops to the ground as the last of their life force is drained from them...".format(me.Name()),purevisual:true},0)
    var alist = this.attackedlist.slice(0)
    for (var i = alist.length - 1; i >= 0; i--)
    {
      var charter = Game.Character(alist[i])
      charter.DoAction(new Action("do",0,0,0,0,"killed"))
    }
    this.attackedlist = []
    // drop items or whatever

    var daction = new Action("deathtransport",me.ID())

    Game.AddActionAbsolute(daction,0)

    return
  }

  if("query" == name && "canattack" == text)
  {
      return false
  }

  if("modifyattribute" == name && "maxhitpoints" == text)
  {
    var charter = this.OwnerID()
    var maxhp = charter.GetAttribute("maxhitpoints")
    var hp = charter.GetAttribute("hitpoints")

    if (hp > maxhp)
    {
      charter.SetAttribute("hitpoints",maxhp)
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




  if("do" == name && text == "breakattack")
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
  var me = Game.Character(this.OwnerID())
  l1("Breaking combat for " + me.Name(),LG_COMBAT_LOGIC)
  if (this.target == 0)
  {
    return
  }

  var attacker = Game.Character(this.OwnerID())
  var target = Game.Character(this.target)
  Game.CancelEvent(this.EventID())
  Game.AddAction({arg1:attacker.Room(),name:"physicalevent",actors:[this.OwnerID(),target.ID()],text:"{0} stops attacking {1}".format(attacker.Name(),target.Name()),purevisual:true},0)
  target.DoAction(new Action("do",0,0,0,0,"brokeattack"))
  this.target = 0
}

RegisterLogic(CombatLogic)
