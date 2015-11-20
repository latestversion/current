CommandCtors = {}

LG_CMD_FTORY = "LG_CMD_FTORY"

function CommandFactory()
{
  Entity.call(this)
  this.SetName("CommandFactory")
}

CopyPrototype(Entity,CommandFactory)

CommandFactory.prototype.RegisterCommand = function(command)
{
  var name = command.name
  l1(this.Name() + ": Registered ctor for command " + name,LG_CMD_FTORY)
  CommandCtors[name] = command
}

CommandFactory.prototype.Create = function(name,arg)
{
  l1(this.Name() + ": Creating command {0} with arg {1}".format(name,arg),LG_CMD_FTORY)

  if(undefined != CommandCtors[name])
  {
    l1(this.Name() + ": Found ctor for name " + name,LG_CMD_FTORY)
    return new CommandCtors[name](arg)
  }

  l9(this.Name() + ": No ctor for command named " + name,LG_CMD_FTORY)
  return undefined
}

CommandFactory = new CommandFactory()

var RegisterCommand = CommandFactory.RegisterCommand.bind(CommandFactory)

Log.logGroups.push(LG_CMD_FTORY)
