function HasPortals()
{
  HasContainer.call(this,"portals")
}

var _p = HasPortals.prototype = {}

CopyProperties(HasContainer.getPrototypeInstance("portals"),HasPortals.prototype)
