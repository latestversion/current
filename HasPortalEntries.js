function HasEntries()
{
  HasArray.call(this,"entries")
}

var _p = HasEntries.prototype

CopyProperties(HasArray.getPrototypeInstance("entries"),HasEntries.prototype)
