function HasItems()
{
  HasArray.call(this,"items")
}

var _p = HasItems.prototype = {}

CopyProperties(HasArray.getPrototypeInstance("items"),HasItems.prototype)
