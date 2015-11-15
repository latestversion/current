
LG_CMDS = "LG_CMDS"

CommandNames = {}
CommandNames.Go = "go"
CommandNames.Get = "get"
CommandNames.Exit = "exit"
CommandNames.Info = "info"
CommandNames.Look = "look"


function GoCommand(cid)
{
  Command.call(this,cid)
}

var _p = GoCommand.prototype
CopyPrototype(Command,GoCommand)

_p.Name = function(){return CommandNames.Go}
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


function GetCommand(cid)
{
  Command.call(this,cid)
}

var _p = GetCommand.prototype
CopyPrototype(Command,GetCommand)

_p.Name = function(){return CommandNames.Get}
_p.Description = function(){return "Makes picking things up possible. Usage: 'get <item> <quantity>'"}

_p.Execute = function(args,charter)
{
  l1("Executing command" + this.Name(),LG_CMDS)

  if(!args.length)
  {
    charter.DoAction({name:"error",text:"Get what?"})
    return
  }

Game.DoAction({name:"getitem",arg1:charter.ID(),text:args})

  // Check arguments
}


function ExitCommand(cid)
{
  Command.call(this,cid)
}

var _p = ExitCommand.prototype
CopyPrototype(Command,ExitCommand)

_p.Name = function(){return CommandNames.Exit}
_p.Description = function(){return "Exits the game."}

_p.Execute = function(args,c)
{
  l1("Executing " + this.Name(),LG_CMDS)
  process.exit()

  // Check arguments
}


function InfoCommand(cid)
{
  Command.call(this,cid)
}

var _p = InfoCommand.prototype
CopyPrototype(Command,InfoCommand)

_p.Name = function(){return CommandNames.Info}
_p.Description = function(){return "info"}

_p.Execute = function(args,c)
{
  l1("Executing " + this.Name(),LG_CMDS)
  room = Game.rdb.Get(c.Room())
  c.DoAction({name:"error",text:JSON.stringify(room)})
  // Check arguments
}


function LookCommand(cid)
{
  Command.call(this,cid)
}

var _p = LookCommand.prototype
CopyPrototype(Command,LookCommand)

_p.Name = function(){return CommandNames.Look}
_p.Description = function(){return "Your primary way of taking in your surroundings."}

_p.Execute = function(args,c)
{
  l1("Executing " + this.Name(),LG_CMDS)
  Game.DoAction({name:"lookroom",cid:c.ID()})
}





