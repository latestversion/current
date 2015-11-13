
LG_CMDS = "LG_CMDS"

CommandNames = {}
CommandNames.Go = "go"
CommandNames.Get = "get"
CommandNames.Exit = "exit"


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
    c.DoAction({name:"error",text:"You are going " + args + "!"})
    Game.DoAction({name:"move",cid:this.cid,text:args[0]})
  }
  else
  {
    l1("There was no direction to the go",LG_CMDS)
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

_p.Execute = function(args,c)
{
  l1("Executing " + this.Name(),LG_CMDS)

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




