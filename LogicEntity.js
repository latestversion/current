evalFile("LogicFactory")


function LogicEntity()
{
  this.logics = []
}

var _p = LogicEntity.prototype

_p.AddLogic = function(logic)
{
  l1("Adding logic {0} to {1} (id:{2})".format(logic.name,this.Name(),this.ID()))
  this.AddExistingLogic(LogicFactory.Create(logic,this.ID()))
  // Hmmm. This is a bit unnecessary. Could as well just call the ctor.
}

_p.AddExistingLogic = function(logicinstance)
{
  this.logics.push(logicinstance)
}

_p.DelLogic = function()
{}

_p.RemoveLogic = function(logic)
{
  l1("Removelogic: " + logic,LG_SPAM)
  var k = 0
  for (;k < this.logics.length; k++)
  {
    l1("Comparing to remove " + this.logics[k].Name(),LG_SPAM)
    if(this.logics[k].Name() == logic.name)
    {
      break
    }
  }

  if(k != this.logics.length)
  {
    l1("Removed logic at index " + i)
    this.logics.splice(k,1)
  }
}

_p.RemoveLogicByID = function(lid)
{


  l1("RemoveLogicByID: Num logics before remove of lid  " + lid + ": " + this.logics.length)
  var i = 0;
  for (; i < this.logics.length; i++)
  {
    var logic = this.logics[i]
    l1("Logic of name {0} of type {1} with .ID() {2}: .OwnerID ? : {3}".format(logic.Name(),logic.Type(),logic.ID(),logic.OwnerID ? logic.OwnerID():"nope"))
    if(this.logics[i].OwnerID && logic.ID() == lid) // && (this.logics[i].OwnerID() == lid))
    {
        break
    }
  }

  if(i != this.logics.length)
  {
    l1("RemoveLogicByID: Removing logic " + this.logics[i].Name())
    this.logics.splice(i,1)
    l1("RemoveLogicByID: Num remaining logics " + this.logics.length)
  }

}

_p.GetLogic = function()
{}

_p.Logics = function()
{
  return this.logics
}

_p.HasLogic = function(name)
{
  for (var k in this.logics)
  {
    if (this.logics[k].Name() == name)
    {
      return true
    }
  }

  return false
}

_p.DoAction = function(action)
{
  l1("DoAction: " + action.name.toUpperCase() + " " + ("query" == action.name ? action.text.toUpperCase() + " " : "") + this.Name() + ": ",LG_SPAM)
	for (var k in this.logics)
	{
    l1(" - " + this.logics[k].Name() + ": ",LG_SPAM)
		if(!this.logics[k].DoAction(action))
    {
      return false
    }
	}

  return true
}

_p.DoActionObject = function(action)
{}

_p.DoActionArgs = function(alotofargs)
{}

