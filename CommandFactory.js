
evalFile("Commands.js")

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

