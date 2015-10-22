function HasCommands()
{
  this.commands = {}
}


var _p = HasCommands.prototype = {}

_p.AddLogic = function(logicname)
{}

_p.AddExistingLogic = function(logicinstance)
{}

_p.DelLogic = function()
{}

_p.GetLogic = function()
{}

_p.HasLogic = function()
{}

_p.DoActionObject = function(action)
{}

_p.DoActionArgs = function(alotofargs)
{}

CopyPrototype(Entity,LogicEntity)
