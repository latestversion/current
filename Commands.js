
evalFile("Command.js")
evalFile("CommandFactory.js")

LG_CMDS = "LG_CMDS"


function GoCommand(cid)
{
  Command.call(this,cid)
  this.SetName("go")
  this.SetDescription("Makes movement possible. Usage: 'go <direction>'")
  this.AddAlias(new Alias("e","go east"))
  this.AddAlias(new Alias("w","go west"))
  this.AddAlias(new Alias("n","go north"))
  this.AddAlias(new Alias("s","go south"))
}

CopyPrototype(Command,GoCommand)

GoCommand.prototype.Execute = function(args,c)
{
	l1("Executing " + this.Name() + " with args " + args,LG_CMDS)

  if(args[0])
  {
    Game.DoAction({name:"move",arg1:this.cid,text:args[0]})
  }
  else
  {
    l1("No direction given in go cmd",LG_CMDS)
    c.DoAction({name:"error",text:"Which direction?"})
  }
}

RegisterCommand(GoCommand)


function ExitCommand(cid)
{
  Command.call(this,cid)
  this.SetName("exit")
  this.SetDescription("Exits the game.")
  this.AddAlias(new Alias("x","exit"))
}
CopyPrototype(Command,ExitCommand)

ExitCommand.prototype.Execute = function(args,c)
{
  l1("Executing " + this.Name(),LG_CMDS)
  process.exit()
}

RegisterCommand(ExitCommand)




function InfoCommand(cid)
{
  Command.call(this,cid)
  this.SetName("info")
  this.SetDescription("info")
  this.AddAlias(new Alias("i","info"))
}
CopyPrototype(Command,InfoCommand)

InfoCommand.prototype.Execute = function(args,c)
{
  l1("Executing " + this.Name(),LG_CMDS)

  if(args.length)
  {
    var id = args[0]
    var entity = Game.Entity(id)
    //c.DoAction({name:"error",text:JSON.stringify(entity.SceneHandler())})
    c.DoAction({name:"error",text:JSON.stringify(entity)})

  }
  else
  {
    room = Game.rdb.Get(c.Room())
    c.DoAction({name:"error",text:JSON.stringify(room)})
  }


}

RegisterCommand(InfoCommand)



function LookCommand(cid)
{
  Command.call(this,cid)
  this.SetName("look")
  this.SetDescription("Your primary way of taking in your surroundings.")
  this.AddAlias(new Alias("l","look"))
}
CopyPrototype(Command,LookCommand)

LookCommand.prototype.Execute = function(args,c)
{
  l1("Executing " + this.Name(),LG_CMDS)
  if(!args.length)
  {
    l1("No args for look command",LG_CMDS)
    Game.DoAction({name:"lookroom",cid:c.ID()})
  }
  else
  {
    l1("args for look command: " + args)
    Game.DoAction({name:"look",arg1:c.ID(),text:args.join(" ")})
  }

}
RegisterCommand(LookCommand)


function TalkCommand(cid)
{
  Command.call(this,cid)
  this.SetName("talk")
  this.SetDescription("Use to communicate with other characters. talk <character name>")
}

CopyPrototype(Command,TalkCommand)

TalkCommand.prototype.Execute = function(args,charter)
{
  l1("Executing " + this.Name(),LG_CMDS)
  if (!args.length)
  {
    charter.DoAction({name:"vision",text:"You talk and talk. If only words were pennies."})
  }
  else
  {
    Game.DoAction({name:"talk",arg1:charter.ID(),arg2:args})
  }
}

RegisterCommand(TalkCommand)


function InventoryCommand(cid)
{
  Command.call(this,cid)
  this.SetName("inventory")
  this.SetDescription("Use to list the items in your inventory.")
  this.AddAlias(new Alias("inv","inventory"))
}

CopyPrototype(Command,InventoryCommand)

InventoryCommand.prototype.Execute = function(args,charter)
{
  l1("Executing " + this.Name(),LG_CMDS)
  charter.DoAction({name:"vision",text:"\n"})
  if(charter.NumItems() == 0)
  {
    charter.DoAction({name:"vision",text:"Your inventory is empty\n"})
  }
  charter.BeginItems()
  var i
  while (i = charter.NextItem())
  {
    var item = idb.Get(i)
    charter.DoAction({name:"vision",text:item.Name()})
  }
}
RegisterCommand(InventoryCommand)

function SayCommand(cid)
{
  Command.call(this,cid)
  this.SetName("say")
  this.SetDescription("It's used to say things to everyone.")
}
CopyPrototype(Command,SayCommand)
SayCommand.prototype.Execute = function(args,charter)
{
  l1("Executing " + this.Name(),LG_CMDS)
  if (!args.length)
  {
    charter.DoAction({name:"vision",text:"Say... what?\n"})
  }
  else
  {
    Game.DoAction({name:"say",arg1:charter.ID(),text:args})
  }
}
RegisterCommand(SayCommand)

function GiveCommand(cid)
{
  Command.call(this,cid)
  this.SetName("give")
  this.SetDescription("give (quantity) <ownitem> <character>")
  this.AddAlias(new Alias("gi","give"))
}
CopyPrototype(Command,GiveCommand)

GiveCommand.prototype.Execute = function(args,charter)
{
  l1("Executing " + this.Name(),LG_CMDS)

  var cid = charter.ID()

  if(args.length == 2 && args[0].isNotNumber())
  {
    l1("I'll give {0} to {1}".format(args[0],args[1]))
    Game.DoAction({name:"giveitem",arg1:cid,arg2:1,arg3:args[0],arg4:args[1]})
    return
  }

  if(args.length >= 3 && args[0].isNumber())
  {
    l1("I'll give {0} {1} to {2}".format(parseInt(args[0]),args[1],args[2]))
    Game.DoAction({name:"giveitem",arg1:cid,arg2:args[0],arg3:args[1],arg4:args[2]})
    return
  }

  charter.DoAction({name:"error",text:this.Description()})

  //Game.DoAction({name:"give",arg1:charter.ID(),text:args})
}
RegisterCommand(GiveCommand)



function DropCommand(cid)
{
  Command.call(this,cid)
  this.SetName("drop")
  this.SetDescription("drop <ownitem>")
}
CopyPrototype(Command,DropCommand)

DropCommand.prototype.Execute = function(args,charter)
{
  l1("Executing " + this.Name(),LG_CMDS)

  var cid = charter.ID()

  if(!args.length)
  {
    charter.DoAction({name:"error",text:this.Description()})
    return
  }

  Game.DoAction({name:"dropitem",arg1:charter.ID(),text:args.join(" ")})
}
RegisterCommand(DropCommand)


function TriggerCommand(cid)
{
  Command.call(this,cid)
  this.SetName("trig")
  this.SetDescription("trig <event>")
}
CopyPrototype(Command,TriggerCommand)

TriggerCommand.prototype.Execute = function(args,charter)
{
  l1("Executing " + this.Name(),LG_CMDS)

  var cid = charter.ID()

  if(!args.length)
  {
    charter.DoAction({name:"error",text:this.Description()})
    return
  }

  Game.DoAction({name:"event",arg1:charter.Room(),text:args[0]})
}
RegisterCommand(TriggerCommand)

function ArmCommand(cid)
{
  Command.call(this,cid)
  this.SetName("arm")
  this.SetDescription("Attempts to equip an item. 'arm <inventoryitem>")
  this.AddAlias(new Alias("a","arm"))
}
CopyPrototype(Command,ArmCommand)

ArmCommand.prototype.Execute = function(args,charter)
{
  l1("Executing " + this.Name(),LG_CMDS)

  var cid = charter.ID()

  if(!args.length)
  {
    charter.DoAction({name:"error",text:this.Description()})
    return
  }

  var itemname = args.join(" ")
  l1("Asked to arm " + itemname,LG_CMDS)

  var items = Game.FilterNamedsByString(charter.Items(),itemname,1)
  if(!items.length)
  {
    charter.DoAction({name:"error",text:"I could not find this '" + itemname + "' that you speak of."})
    return
  }

  var item = items[0]
  if(charter.DoAction({name:"query",arg1:item.ID(),text:"canarm"}))
  {
    charter.DoAction({name:"error",text:"It seems {0} cannot be armed.".format(item.Name())})
    return
  }

  charter.DoAction({name:"do",text:"arm",arg1:item.ID()})
}
RegisterCommand(ArmCommand)

function DisarmCommand(cid)
{
  Command.call(this,cid)
  this.SetName("disarm")
  this.SetDescription("Attempts to unequip an item. 'disarm <armeditem>")
  this.AddAlias(new Alias("da","disarm"))
}
CopyPrototype(Command,DisarmCommand)

DisarmCommand.prototype.Execute = function(args,charter)
{
  l1("Executing " + this.Name(),LG_CMDS)

  var cid = charter.ID()

  if(!args.length)
  {
    args = false
  }
  else
  {
    args = args.join(" ")
  }

  charter.DoAction({name:"do",text:"disarm",args:args})
}
RegisterCommand(DisarmCommand)

function AttackCommand(cid)
{
  Command.call(this,cid)
  this.SetName("attack")
  this.SetDescription("Attempts to attack a character. 'attack <roomcharacter>")
  this.AddAlias(new Alias("att","attack"))
}
CopyPrototype(Command,AttackCommand)

AttackCommand.prototype.Execute = function(args,charter)
{
  l1("Executing " + this.Name(),LG_CMDS)

  var cid = charter.ID()
  var room = Game.Room(charter.Room())
  var searchstring = args.join(" ")
  var target = Game.FilterNamedsByString(room.Characters(),searchstring)[0]

  if(!target && charter.IsPlayer())
  {
    charter.DoAction({name:"error",text:"There is no " + searchstring + " here that you can attack."})
    return
  }

  if(target.DoAction({name:"query",arg1:cid,text:"canattack"}))
  {
    charter.DoAction({name:"info",text:"{0} isn't really compatible with fighting.".format(target.Name())})
    return
  }

  charter.DoAction({name:"do",arg3:target.ID(),text:"initattack"})
}
RegisterCommand(AttackCommand)


function BreakCommand(cid)
{
  Command.call(this,cid)
  this.SetName("break")
  this.SetDescription("Stops attacking your target.")
}
CopyPrototype(Command,BreakCommand)

BreakCommand.prototype.Execute = function(args,charter)
{
  l1("Executing " + this.Name(),LG_CMDS)

  charter.DoAction({name:"do",text:"breakattack"})
}
RegisterCommand(BreakCommand)

function EvalCommand(cid)
{
  Command.call(this,cid)
  this.SetName("eval")
  this.SetDescription("Be a god.")
}
CopyPrototype(Command,EvalCommand)

EvalCommand.prototype.Execute = function(args,charter)
{
  l1("Executing " + this.Name(),LG_CMDS)

  eval(args.join(" "))
}
RegisterCommand(EvalCommand)

function HelpCommand(cid)
{
  Command.call(this,cid)
  this.SetName("help")
  this.SetDescription("Lists the commands available.")
  this.AddAlias(new Alias("h","help"))
}
CopyPrototype(Command,HelpCommand)

HelpCommand.prototype.Execute = function(args,charter)
{
  l1("Executing " + this.Name(),LG_CMDS)

  Game.DoAction({name:"help",arg1:charter.ID()})
}
RegisterCommand(HelpCommand)


function GetCommand(cid)
{
  Command.call(this,cid)
  this.SetName("get")
  this.SetDescription("'get <grounditem> or 'get <item> <from|_from_> <invitem>'")
  this.AddAlias(new Alias("g","get"))
}
CopyPrototype(Command,GetCommand)
GetCommand.prototype.Execute = function(args,charter)
{
  l1("Executing command" + this.Name(),LG_CMDS)

  if(!args.length)
  {
    charter.DoAction({name:"error",text:"Get what?"})
    return
  }


  var fromidx = args.indexOf("_from_")
  if( -1 == fromidx)
  {
    fromidx = args.indexOf("from")
  }

  if(-1 == fromidx)
  {
    Game.DoAction({name:"getitem",arg1:charter.ID(),args:args,text:args.join(" ")})
    return
  }

  // get from container
  var itemtogetstring
  var containerstring
  var idx = fromidx

  containerstring = (args.splice(idx+1,args.length-(idx+1))).join(" ")
  itemtogetstring = (args.splice(0,idx)).join(" ")

  if(!containerstring || !itemtogetstring)
  {
    charter.DoAction({name:"info",text:"Eh... get what from what?\n"})
    return
  }

  l1(charter.Name() + " wants to get '{0}' from '{1}'".format(itemtogetstring,containerstring),LG_SPAM)

  // Check if charter has container

  var charteritems = Game.FilterNamedsByString(charter.Items(),containerstring,1)

  if(!charteritems.length)
  {
    charter.DoAction(new InfoAction("You don't seem to have '{0}' in your inventory!".format(containerstring)))
    return
  }

  var container = charteritems[0]


  if(container.DoAction(new QueryContainerAction()))
  {
    charter.DoAction(new InfoAction("'{0}' is not a container!".format(container.Name())))
    return
  }


  var containeritems = Game.FilterNamedsByString(container.Items(),itemtogetstring,1)

  if(!containeritems.length)
  {
    charter.DoAction(new InfoAction("There is no '{0}' in {1}!".format(itemtogetstring,container.Name())))
    return
  }

  var item = containeritems[0]

  // Transfer ownership
  container.RemoveItem(item.ID())
  item.SetCharacter(charter.ID())
  item.SetItem(0)
  charter.AddItem(item.ID())

  charter.DoAction(new InfoAction("You retrieve {0} from {1}.".format(item.Name(),container.Name())))

  l1("{0} {1} did get {2} {3} from {4} {5}".format(charter.Name(),charter.ID,item.Name(),item.ID(),container.Name(),container.ID()),LG_SPAM)

}
RegisterCommand(GetCommand)


function PutCommand(cid)
{
  Command.call(this,cid)
  this.SetName("put")
  this.SetDescription("Put items in other items. put <invitem> <invitem>.")
}
CopyPrototype(Command,PutCommand)
PutCommand.prototype.Execute = function(args,charter)
{
  // args is an array
  l1("Executing " + this.Name(),LG_CMDS)
  // put <invitem> [in|_in_] <invitem>

  if (args.length < 2)
  {
    charter.DoAction({name:"info",text:"Put what in what?\n"})
    return
  }

  var inidx = args.indexOf("_in_")
  if( -1 == inidx)
  {
    inidx = args.indexOf("in")
  }

  var itemtoputstring
  var containerstring

  if (-1 != inidx)
  {
    containerstring = (args.splice(inidx+1,args.length-(inidx+1))).join(" ")
    itemtoputstring = (args.splice(0,inidx)).join(" ")
    if(!containerstring || !itemtoputstring)
    {
      charter.DoAction({name:"info",text:"Eh... put what in what?\n"})
      return
    }
  }
  else
  {
    itemtoputstring = args[0]
    containerstring = args[1]
  }

  l1(charter.Name() + " wants to put '{0}' in '{1}'".format(itemtoputstring,containerstring),LG_SPAM)

  var items = Game.FilterNamedsByString(charter.Items(),itemtoputstring,1)

  if(!items.length)
  {
    charter.DoAction(new InfoAction("You don't seem to have a '{0}' in your inventory!".format(itemtoputstring)))
    return
  }

  var item = items[0]

  var containeritems = Game.FilterNamedsByString(charter.Items(),containerstring,1)

  if(!containeritems.length)
  {
    charter.DoAction(new InfoAction("You don't seem to have a '{0}' in your inventory!".format(containerstring)))
    return
  }

  var container = containeritems[0]

  if(container.DoAction(new QueryContainerAction()))
  {
    charter.DoAction(new InfoAction("'{0}' is not a container!".format(container.Name())))
    return
  }

  if(item.ID() == container.ID())
  {
    charter.DoAction(new InfoAction("You can't put {0} in itself!".format(item.ID())))
    return
  }

  var attemptaction = new AttemptPutItemInContainerAction(this.cid,item.ID(),container.ID())
  if(!item.DoAction(attemptaction) || !container.DoAction(attemptaction))
  {
    return
  }

  // Transfer ownership
  charter.RemoveItem(item.ID())
  item.SetCharacter(0)
  item.SetItem(container.ID())
  container.AddItem(item.ID())

  var didputitemaction = new DidPutItemInContainerAction(this.cid,item.ID(),container.ID())

  item.DoAction(didputitemaction)
  container.DoAction(didputitemaction)

  charter.DoAction(new InfoAction("You put {0} in {1}.".format(item.Name(),container.Name())))

  l1("{0} {1} did put {2} {3} in {4} {5}".format(charter.Name(),charter.ID,item.Name(),item.ID(),container.Name(),container.ID()),LG_SPAM)

  //Game.DoAction({name:"put",arg1:charter.ID(),arg2:args[0],arg3:args[1]})

}
RegisterCommand(PutCommand)


function LookInCommand(cid)
{
  Command.call(this,cid)
  this.SetName("lookin")
  this.SetDescription("Look in items. lookin <invitem>.")
}
CopyPrototype(Command,LookInCommand)
LookInCommand.prototype.Execute = function(args,charter)
{
  // args is an array
  l1("Executing " + this.Name(),LG_CMDS)
  // put <invitem> [in|_in_] <invitem>

  if (args.length < 1)
  {
    charter.DoAction({name:"info",text:"Look in what?\n"})
    return
  }


  var containerstring = args.join(" ")

  l1(charter.Name() + " wants to look in '{0}'".format(containerstring),LG_SPAM)

  var containeritems = Game.FilterNamedsByString(charter.Items(),containerstring,1)

  if(!containeritems.length)
  {
    charter.DoAction(new InfoAction("You don't seem to have a '{0}' in your inventory!".format(containerstring)))
    return
  }

  var container = containeritems[0]

  if(container.DoAction(new QueryContainerAction()))
  {
    charter.DoAction(new InfoAction("'{0}' is not a container!".format(container.Name())))
    return
  }

  /*var attemptaction = new AttemptLookInContainerAction(charter.ID(),container.ID())

  if(!container.DoAction(attemptaction))
  {
    return
  }*/

  if(!container.NumItems())
  {
    charter.DoAction(new InfoAction("{0} is empty.".format(container.Name())))
    return
  }


  var s = container.Name() + " holds the following items:\n"
  container.BeginItems()
  var iid
  if(iid = container.NextItem())
  {
    var item = Game.Item(iid)
    s += "{0}\n".format(item.Name())
  }

  s += "\n"

  charter.DoAction(new InfoAction(s))
}
RegisterCommand(LookInCommand)


