
evalFile("Command.js")
evalFile("CommandFactory.js")

LG_CMDS = "LG_CMDS"


function GoCommand(cid)
{
  Command.call(this,cid)
  this.SetName("go")
  this.SetDescription("Makes movement possible. Usage: 'go <direction>'")
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


function GetCommand(cid)
{
  Command.call(this,cid)
  this.SetName("get")
  this.SetDescription("Makes picking things up possible. Usage: 'get <item> <quantity>'")
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

Game.DoAction({name:"getitem",arg1:charter.ID(),text:args.join(" ")})
}

RegisterCommand(GetCommand)



function ExitCommand(cid)
{
  Command.call(this,cid)
  this.SetName("exit")
  this.SetDescription("Exits the game.")
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
}
CopyPrototype(Command,InfoCommand)

InfoCommand.prototype.Execute = function(args,c)
{
  l1("Executing " + this.Name(),LG_CMDS)
  room = Game.rdb.Get(c.Room())
  c.DoAction({name:"error",text:JSON.stringify(room)})
}

RegisterCommand(InfoCommand)



function LookCommand(cid)
{
  Command.call(this,cid)
  this.SetName("look")
  this.SetDescription("Your primary way of taking in your surroundings.")
}
CopyPrototype(Command,LookCommand)

LookCommand.prototype.Execute = function(args,c)
{
  l1("Executing " + this.Name(),LG_CMDS)
  Game.DoAction({name:"lookroom",cid:c.ID()})
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




