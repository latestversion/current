function DataEntity()
{
  this.data = {}
}

DataEntity.prototype

var _p = DataEntity.prototype

_p.GetAttribute = function(name)
{
  return this.data[name]
}

_p.SetAttribute = function(name,val)
{
  this.data[name] = val
}

_p.HasAttribute = function(name)
{
  return undefined != this.data[name]
}

_p.AddAttribute = function(name,initval)
{
  this.data[name] = initval
}

_p.DelAttribute = function(name)
{
  delete this.data[name]
}
