function LogicEntity()
{
  Entity.call(this)
  this.logics = []
}

LogicEntity.prototype
var _p = LogicEntity.prototype

_p.AddLogic = function(logic)
{
	this.logics.push(logic)
}

_p.AddExistingLogic = function(logicinstance)
{}

_p.DelLogic = function()
{}

_p.GetLogic = function()
{}

_p.HasLogic = function()
{}

_p.DoAction = function(action)
{
	for (var k in this.logics)
	{
		this.logics[k].DoAction(action)
	}
}

_p.DoActionObject = function(action)
{}

_p.DoActionArgs = function(alotofargs)
{}

CopyPrototype(Entity,LogicEntity)
