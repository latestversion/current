function HasEntries()
{
  HasArray.call(this,"entries")
}

var _p = HasPortals.prototype

CopyProperties(HasArray.getPrototypeInstance("entries"),HasEntries.prototype)
