
evalFile("Command.js")
evalFile("CommandFactory.js")

LG_CMDS = "LG_CMDS"


function GoCommand(cid)
{
  Command.call(this,cid)
  this.SetName("go")
}

var _p = GoCommand.prototype
CopyPrototype(Command,GoCommand)

_p.Description = function(){return "Makes movement possible. Usage: 'go <direction>'"}

_p.Execute = function(args,c)
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

RegisterCommand(GoCommand.name)


function GetCommand(cid)
{
  Command.call(this,cid)
  this.SetName("get")
}

var _p = GetCommand.prototype
CopyPrototype(Command,GetCommand)

_p.Description = function(){return "Makes picking things up possible. Usage: 'get <item> <quantity>'"}
_p.Execute = function(args,charter)
{
  l1("Executing command" + this.Name(),LG_CMDS)

  if(!args.length)
  {
    charter.DoAction({name:"error",text:"Get what?"})
    return
  }

Game.DoAction({name:"getitem",arg1:charter.ID(),text:args.join(" ")})

  // Check arguments
}

RegisterCommand(GetCommand.name)


function ExitCommand(cid)
{
  Command.call(this,cid)
  this.SetName("exit")
}

var _p = ExitCommand.prototype
CopyPrototype(Command,ExitCommand)

_p.Description = function(){return "Exits the game."}

_p.Execute = function(args,c)
{
  l1("Executing " + this.Name(),LG_CMDS)
  process.exit()

  // Check arguments
}

RegisterCommand(ExitCommand.name)




function InfoCommand(cid)
{
  Command.call(this,cid)
  this.SetName("info")
}

var _p = InfoCommand.prototype
CopyPrototype(Command,InfoCommand)

_p.Description = function(){return "info"}

_p.Execute = function(args,c)
{
  l1("Executing " + this.Name(),LG_CMDS)
  room = Game.rdb.Get(c.Room())
  c.DoAction({name:"error",text:JSON.stringify(room)})
  // Check arguments
}

RegisterCommand(InfoCommand.name)



function LookCommand(cid)
{
  Command.call(this,cid)
  this.SetName("look")
}

var _p = LookCommand.prototype
CopyPrototype(Command,LookCommand)

_p.Description = function(){return "Your primary way of taking in your surroundings."}

_p.Execute = function(args,c)
{
  l1("Executing " + this.Name(),LG_CMDS)
  Game.DoAction({name:"lookroom",cid:c.ID()})
}

RegisterCommand(LookCommand.name)



function TalkCommand(cid)
{
  Command.call(this,cid)
  this.SetName("talk")
}

var _p = TalkCommand.prototype
CopyPrototype(Command,TalkCommand)

_p.Description = function(){return "Use to communicate with other characters. talk <character name>"}

_p.Execute = function(args,charter)
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

RegisterCommand(TalkCommand.name)




function InventoryCommand(cid)
{
  Command.call(this,cid)
  this.SetName("inventory")
}

var _p = InventoryCommand.prototype
CopyPrototype(Command,InventoryCommand)

_p.Description = function(){return "Use to list the items in your inventory."}

_p.Execute = function(args,charter)
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

RegisterCommand(InventoryCommand.name)



function SayCommand(cid)
{
  Command.call(this,cid)
  this.SetName("say")
}

var _p = SayCommand.prototype
CopyPrototype(Command,SayCommand)

_p.Description = function(){return "It's used to say things to everyone."}

_p.Execute = function(args,charter)
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

RegisterCommand(SayCommand.name)




