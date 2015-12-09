evalFile("HasMap.js")

function HasCommands()
{
  HasMap.call(this,"commands")
}

CopyProperties(HasMap.getPrototypeInstance("commands"),HasCommands.prototype)

var _p = HasCommands.prototype

_p._AddCommand = _p.AddCommand

_p.AddCommand = function(command)
{
  l1("Add command {0} for cid {1}".format(command.name,this.ID()))

  var command = CommandFactory.Create(command,this.ID())

  this._AddCommand(command.Name(),command)
}
