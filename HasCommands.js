function HasCommands()
{
  HasContainer.call(this,"commands")
}

var _p = HasCommands.prototype = {}

CopyProperties(HasContainer.getPrototypeInstance("commands"),HasCommands.prototype)
