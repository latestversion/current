function Database(savefile,typeprototype)
{
  this.savefile = defaultsavefilename
  this.typeprototype = typeprototype
  this.database = []
}

var _p = Database.prototype = {}

_p.FindName = function(name){}
_p.Get = function(id){}
_p.Create = function(id){}
_p.Size = function(){return this.database.length}
_p.Save = function(){}
_p.Load = function(){}
_p.LoadEntity = function(id){}
_p.SaveEntity = function(entity){}

_p.LoadDirectory = function(dir)
{
  var file = dir + "/" + this.defaultsavefilename
  var s = readFile(file)
  var parsed = JSON.parse(s)
  for(var i in parsed)
  {
    parsed[i].__proto__ = this.typeprototype
    this.database.push(parsed[i])
  }

}
_p.LoadFile = function(){}


