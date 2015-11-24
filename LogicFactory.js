LogicCtors = {}

LG_LOGIC_FTORY = "LG_LOGIC_FTORY"

function LogicFactory()
{
  Entity.call(this)
  this.SetName("LogicFactory")
}

CopyPrototype(Entity,LogicFactory)


LogicFactory.prototype.RegisterLogic = function(logic)
{
  l1(this.Name() + ": Registered ctor for logic " + logic.name,LG_LOGIC_FTORY)
  LogicCtors[logic.name] = logic
}

LogicFactory.prototype.Create = function(logic,arg)
{
  var logicname = logic.name
  l1(this.Name() + ": Creating logic {0} with arg {1}".format(logicname,arg),LG_LOGIC_FTORY)

  if(undefined != LogicCtors[logicname])
  {
    l1(this.Name() + ": Found ctor for logicname " + logicname,LG_LOGIC_FTORY)
    return new LogicCtors[logicname](arg)
  }

  l9(this.Name() + ": No ctor for logic named " + logicname,LG_LOGIC_FTORY)
  return undefined
}

LogicFactory = new LogicFactory()

RegisterLogic = LogicFactory.RegisterLogic.bind(LogicFactory)

//Log.logGroups.push(LG_LOGIC_FTORY)
