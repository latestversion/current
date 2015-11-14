function Database(savefile,typeprototype)
{
  Entity.call(this)
  this.defaultsavefile = savefile
  this.typeprototype = typeprototype
  this.database = []
  this.factory = {}
  this.maxid = 1
  this.loopidx = 0
}

CopyPrototype(Entity,Database)

var _p = Database.prototype

_p.GetFreeID = function()
{
  this.maxid += 1
  l1(this.Name() + ": "  + "The max id is now " + this.maxid,LG_DB)
  return this.maxid
}

_p.Add = function(e)
{
  l1(this.Name() + ": " + " Added an entity to database: ("  + e.Name() + "," + e.ID() + ")",LG_DB)
  this.database.push(e)
  if(e.ID() > this.maxid)
  {
    this.maxid = e.ID()
  }
  l1("The db size is now " + this.Size(),LG_DB)
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

  l5("{0}: Did not find an entity with ID {1}".format(this.Name(),id),LG_ERR)

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
  l(this.Name() + " Loading file " + file,LG_DB)
  var s = readFile(file)
  var parsed = JSON.parse(s)
  l1(this.Name() + " Parsed an array of length " + parsed.length,LG_DB)
  for(var idx in parsed)
  {
    parsed[idx].__proto__ = this.typeprototype
    parsed[idx].Revive()
    this.Add(parsed[idx])
  }
}
_p.LoadFile = function(){}

_p.Purge = function()
{
  l1(this.Name() + ": " + "Purging.",LG_DB)
  this.database = []
  this.maxid = 0
}

_p.Start = function()
{
  this.loopidx = 0
}

_p.Begin = function()
{
  this.Start()
}

_p.Next = function()
{
  return this.database[this.loopidx++]
}

_p.Iterator = function()
{
  return new ArrayIterator(this.database)
}
