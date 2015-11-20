
evalFile("Entity.js")

function Command(cid)
{
  Entity.call(this)
  this.cid = cid
}
CopyPrototype(Entity,Command)

Command.prototype.Execute = function(args,c)
{
  l5("Command.Execute lacks implementation",LG_CMDS)
  l5("Abstract Execute called with (args,c)->(" + args + "," + c.Name() + ")",LG_CMDS)
}



