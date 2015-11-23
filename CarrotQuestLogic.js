evalFile("ItemFactory.js")


function CarrotQuestLogic(id)
{
  Entity.call(this)
  this.id = id
  this.SetName("CarrotQuestLogic")

  this.state = CarrotQuestLogic.StateEnums.Init
  this.carrotsLeft = 8
}

CarrotQuestLogic.StateEnums = {}
CarrotQuestLogic.StateEnums.Init = 0
CarrotQuestLogic.StateEnums.Ongoing = 1
CarrotQuestLogic.StateEnums.Finished = 2

var _p = CarrotQuestLogic.prototype

CopyPrototype(Entity,CarrotQuestLogic)

_p.DoAction = function(a)
{
  if(a.name == "didenterroom" && this.state == CarrotQuestLogic.StateEnums.Init)
  {
    var c = cdb.Get(a.arg1)
    if(c.IsPlayer())
    {
      Game.AddAction({name:"say",arg1:this.id,text:"I've got a nice little carrot quest going, if you're interested."},2000)
      Game.AddAction({name:"say",arg1:this.id,text:"Bring me {0} carrots and I'll give you a nice prize.".format(this.carrotsLeft)},3000)
      return false
    }
  }

  if(a.name == "didgiveitem" && a.arg3 == this.id)
  {
    var c = cdb.Get(a.arg1)
    if(c.IsPlayer())
    {
      var iid = a.arg2
      item = Game.idb.Get(iid)
      if (item.Template() == ItemTemplateIDs.MediocreCarrot || item.Template() == ItemTemplateIDs.DamnFineCarrot)
      {
       this.carrotsLeft -= 1
      }

      if(this.carrotsLeft)
      {
        this.state = CarrotQuestLogic.StateEnums.Ongoing
        Game.AddAction({name:"say",arg1:this.id,text:"Only {0} more and the prize will be yours!".format(this.carrotsLeft)},1000)
        return false
      }
      else
      {
        Game.AddActionAbsolute({name:"say",arg1:this.id,text:"Nice! Tonight you shall feast in VALHALLA!".format(this.carrotsLeft)},0)
        this.state = CarrotQuestLogic.StateEnums.Finished
      }
    }
  }

  if(a.name == "attemptgiveitem" && a.arg3 == this.id)
  {
    if(this.state == CarrotQuestLogic.StateEnums.Finished)
    {
      Game.AddAction({name:"say",arg1:this.id,text:"It's okay thx I'm fine.".format(this.carrotsLeft)},0)
      return false
    }
  }

  return true
}

RegisterLogic(CarrotQuestLogic)


