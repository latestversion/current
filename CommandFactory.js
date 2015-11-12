
evalFile("log.js")
evalFile("Game.js")


LG_CMDS = "LG_CMDS"

CommandNames = {}
CommandNames.Go = "go"
CommandNames.Get = "get"


function GoCommand(cid)
{
  Command.call(this,cid)
}

var _p = GoCommand.prototype
CopyPrototype(Command,GoCommand)

_p.Name = function(){return CommandNames.Go}
_p.Description = function(){return "Makes movement possible. Usage: 'go <direction>'"}

_p.Execute = function()
{
  l1("Executing " + this.Name(),LG_CMDS)
}


function GetCommand(cid)
{
  Command.call(this,cid)
}

var _p = GetCommand.prototype
CopyPrototype(Command,GetCommand)

_p.Name = function(){return CommandNames.Get}
_p.Description = function(){return "Makes picking things up possible. Usage: 'get <item> <quantity>'"}

_p.Execute = function(args)
{
  l1("Executing " + this.Name(),LG_CMDS)

  // Check arguments
}


LG_CMD_FAC = "LG_CMD_FAC"

CommandFactory = {}

CommandFactory.Create = function(cmdname,cid)
{

  l1("Creating command " + cmdname,LG_CMD_FAC)
  var newcmd = false

  if (CommandNames.Go == cmdname)
  {
    newcmd = new GoCommand(cid)
  }

  if(CommandNames.Get == cmdname)
  {
    newcmd = new GetCommand(cid)
  }

  if(newcmd)
  {
    l1("Created command " + newcmd.Name(),LG_CMD_FAC)
    return newcmd
  }

  l5("Command '" + cmdname + "' constructor not found.",LG_CMD_FAC)
  return false
}

