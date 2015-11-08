function Database(savefile,typeprototype)
{
  this.defaultsavefile = savefile
  this.typeprototype = typeprototype
  this.database = []
  this.factory = {}
}

var _p = Database.prototype


_p.Add = function(e)
{
  l1("Added an entity to database: ("  + e.Name() + "," + e.ID() + ")",LG_DB)
  this.database.push(e)
  l1("The size is now " + this.Size())
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

  l5("Did not find an entity with ID " + id,LG_ERR)

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

_p.SaveToDirectory = function(dir)
{
  var file = dir + "/" + this.defaultsavefile
  var s = JSON.stringify(this.database)
  writeFile(file,s)
}

_p.LoadDirectory = function(dir,purge)
{
  if(purge)
  {
    this.Purge()
  }
  var file = dir + "/" + this.defaultsavefile
  l("Loading file " + file)
  var s = readFile(file)
  var parsed = JSON.parse(s)
  l1("Parsed an array of length " + parsed.length)
  for(var idx in parsed)
  {
    parsed[idx].__proto__ = this.typeprototype
    this.Add(parsed[idx])
  }
}
_p.LoadFile = function(){}

_p.Purge = function()
{
  this.database = []
}

_p.Iterator = function()
{
  return new ArrayIterator(this.database)
}
