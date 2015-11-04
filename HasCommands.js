evalFile("HasMapContainer.js")

function HasCommands()
{
  HasMap.call(this,"commands")
}

var _p = HasCommands.prototype = {}

CopyProperties(HasMap.getPrototypeInstance("commands"),HasCommands.prototype)
