
evalFile("Entity.js")

function Command(cid)
{
  Entity.call(this)
  this.cid = cid
}

var _p = Command.prototype


_p.Execute = function()
{
  l5("Command.Execute lacks implementation",LG_CMDS)
}



