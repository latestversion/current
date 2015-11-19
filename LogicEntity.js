function LogicEntity()
{
  this.logics = []
}

var _p = LogicEntity.prototype

_p.AddLogic = function(logicname)
{
  l1("Adding logic {0} to {1} (id:{2})".format(logicname,this.Name(),this.ID()))
  this.AddExistingLogic(LogicFactory.Create(logicname,this.ID()))
}

_p.AddExistingLogic = function(logicinstance)
{
  this.logics.push(logicinstance)
}

_p.DelLogic = function()
{}

_p.GetLogic = function()
{}

_p.HasLogic = function()
{}

_p.DoAction = function(action)
{
  l1("DoAction for action " + action.name,LG_SPAM)
	for (var k in this.logics)
	{
    l1("Checking with logic " + this.logics[k].Name(),LG_SPAM)
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

