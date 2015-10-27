function Database()
{
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
_p.LoadDirectory = function(dir){}
_p.LoadFile = function(){}


