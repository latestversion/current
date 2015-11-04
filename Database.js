function Database(savefile,typeprototype)
{
  this.defaultsavefile = savefile
  this.typeprototype = typeprototype
  this.database = []
  this.factory = {}
}

var _p = Database.prototype = {}


_p.AddEntity = function(e)
{
  this.database.push(e)
}

_p.FindName = function(name){}

_p.Get = function(id)
{
  for (var k in this.database)
  {
    if(this.database[k].ID() == id)
    {
      return this.database[k]
    }
  }

  return false
}
_p.Create = function(tid)
{
  if(this.factory)
  {
    return this.factory.Create(tid)
  }
  else
  {
    throw "No factory in Create call for database, tid " + tid
  }
}
_p.Size = function(){return this.database.length}
_p.Save = function(){}
_p.Load = function(){}
_p.LoadEntity = function(id){}
_p.SaveEntity = function(entity){}
_p.SetFactory = function(factory)
{
  this.factory = factory
}
_p.LoadDirectory = function(dir)
{
  var file = dir + "/" + this.defaultsavefile
  var s = readFile(file)
  var parsed = JSON.parse(s)
  for(var i in parsed)
  {
    parsed[i].__proto__ = this.typeprototype
    this.database.push(parsed[i])
  }

}
_p.LoadFile = function(){}


