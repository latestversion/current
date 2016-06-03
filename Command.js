
evalFile("Entity.js")

function Alias(name,description)
{
	Entity.call(this)
	this.SetName(name)
	this.SetDescription(description)
}

CopyPrototype(Entity,Alias)

function Command(cid)
{
  Entity.call(this)
  this.cid = cid
  this.aliases = {}
}
CopyPrototype(Entity,Command)

var _p = Command.prototype

_p.Execute = function(args,c)
{
  l5("Command.Execute lacks implementation",LG_CMDS)
  l5("Abstract Execute called with (args,c)->(" + args + "," + c.Name() + ")",LG_CMDS)
}

_p.AddAlias = function(a)
{
	this.aliases[a.Name()] = a
}

_p.HasAliasName = function(name)
{
	if(this.aliases[name])
	{
		return true
	}
	return false
}

_p.AliasDescription = function(name)
{
	return this.aliases[name].Description()
}

_p.AliasIterator = function()
{
	return new MapIterator(this.aliases)
}



