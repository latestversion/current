
evalFile("Commands.js")

LG_CMD_FAC = "LG_CMD_FAC"

CommandFactory = {}

// omg this should be remade into something similar to the logics factory

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

  if(CommandNames.Info == cmdname)
  {
    newcmd = new InfoCommand(cid)
  }

  if(CommandNames.Look == cmdname)
  {
    newcmd = new LookCommand(cid)
  }

  if(CommandNames.Exit == cmdname)
  {
    newcmd = new ExitCommand(cid)
  }

  if(CommandNames.Talk == cmdname)
  {
    newcmd = new TalkCommand(cid)
  }

  if(CommandNames.Inventory == cmdname)
  {
    newcmd = new InventoryCommand(cid)
  }

  if(newcmd)
  {
    l1("Created command " + newcmd.Name(),LG_CMD_FAC)
    return newcmd
  }

  l9("Command '" + cmdname + "' constructor not found.",LG_CMD_FAC)

  return false
}

