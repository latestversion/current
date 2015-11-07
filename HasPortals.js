function HasPortals()
{
  HasArray.call(this,"portals")
}

var _p = HasPortals.prototype = {}

CopyProperties(HasArray.getPrototypeInstance("portals"),HasPortals.prototype)
