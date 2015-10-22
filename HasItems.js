function HasItems()
{
  HasContainer.call(this,"items")
}

var _p = HasItems.prototype = {}

CopyProperties(HasContainer.getPrototypeInstance("items"),HasItems.prototype)
